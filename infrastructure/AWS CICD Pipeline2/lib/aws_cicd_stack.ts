import * as cdk from "@aws-cdk/core"
import * as codepipeline from "@aws-cdk/aws-codepipeline"
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions"
import * as codebuild from "@aws-cdk/aws-codebuild"
import * as secretsmanager from "@aws-cdk/aws-secretsmanager"
import * as iam from "@aws-cdk/aws-iam"
import * as s3 from "@aws-cdk/aws-s3"
import * as cloudfront from "@aws-cdk/aws-cloudfront"
import * as origins from "@aws-cdk/aws-cloudfront-origins"
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines"

require("dotenv").config()

//1. Generate Github Access token
//2. Set the Token AWS secrets manager console.
//3. Get the arn

export class CICDStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    //Get Github access token
    const secretGithub = secretsmanager.Secret.fromSecretAttributes(this, "ImportedSecret", {
      secretArn: `arn:aws:secretsmanager:us-east-1:867137601660:secret:/github-access-token-NuotsR`,
    })
    const roleCodeBuild = new iam.Role(this, "CodeBuildRole", {
      assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com"),
    })
    secretGithub.grantRead(roleCodeBuild)

    // Get github access token
    const owner = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : "GithubOwner"
    const repo = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : "Repo"
    const oauthToken = secretGithub.secretValueFromJson("GITHUB_ACCESS_TOKEN")

    const sourceArtifact = new codepipeline.Artifact()
    const cloudAssemblyArtifact = new codepipeline.Artifact()

    const project = new CdkPipeline(this, "MyProject", {
      pipelineName: "MyAppPipeline",
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: "GitHub_Source",
        owner,
        repo,
        oauthToken,
        branch: "main",
        output: sourceArtifact,
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build",
      }),
    })

    //deploy stage
    const outputBucket = new s3.Bucket(this, "BuildOutputBucket", {})
    const deployAction = new codepipeline_actions.S3DeployAction({
      actionName: "S3Deploy",
      bucket: outputBucket,
      input: cloudAssemblyArtifact,
    })

    //new cloudfront.Distribution(this, "myDist", {
    //  defaultBehavior: {origin: new origins.S3Origin(outputBucket)},
    //})
  }
}
