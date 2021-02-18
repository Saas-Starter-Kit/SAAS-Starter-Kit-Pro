import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as codepipeline from "@aws-cdk/aws-codepipeline"
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions"
import * as codebuild from "@aws-cdk/aws-codebuild"
import * as secretsmanager from "@aws-cdk/aws-secretsmanager"
import * as iam from "@aws-cdk/aws-iam"
import * as s3 from "@aws-cdk/aws-s3"
import * as cloudfront from "@aws-cdk/aws-cloudfront"
import * as origins from "@aws-cdk/aws-cloudfront-origins"

require("dotenv").config()

//1. Generate Github Access token
//2. Set the Token AWS secrets manager console.
//3. Get the arn

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    //create vpc
    const vpc = new ec2.Vpc(this, "VPC", {
      natGateways: 1,
      maxAzs: 3,
    })

    //Get Github access token
    const secretGithub = secretsmanager.Secret.fromSecretAttributes(this, "ImportedSecret", {
      secretArn: `arn:aws:secretsmanager:us-east-1:867137601660:secret:/github-access-token-NuotsR`,
    })
    const roleCodeBuild = new iam.Role(this, "CodeBuildRole", {
      assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com"),
    })

    secretGithub.grantRead(roleCodeBuild)

    // Source Stage with github
    const owner = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : "GithubOwner"
    const repo = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : "Repo"
    const oauthToken = secretGithub.secretValueFromJson("GITHUB_ACCESS_TOKEN")

    const sourceOutput = new codepipeline.Artifact()
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "GitHub_Source",
      owner,
      repo,
      oauthToken,
      branch: "main",
      output: sourceOutput,
    })

    //Build Stage
    const buildSpecObj = {
      version: "0.2",
      phases: {
        install: {
          "runtime-versions": {
            nodejs: 10,
          },
        },
        pre_build: {
          commands: ['echo "--------PREBUILD PHASE--------"', "npm install"],
        },
        build: {
          commands: ["npm run build"],
        },
      },
      artifacts: {
        files: ["*/*"],
        basedirectory: "build",
      },
    }

    // const buildSpecObj2 = {
    //  version: "0.2",
    //  phases: {
    //    install: {
    //      "runtime-versions": {
    //        nodejs: 10,
    //      },
    //    },
    //    pre_build: {
    //      commands: ['echo "--------PREBUILD PHASE--------"', "cd client", "npm install"],
    //    },
    //    build: {
    //      commands: ["npm run build", "npm run export"],
    //    },
    //  },
    //  artifacts: {
    //    files: ["out/*"],
    //    basedirectory: 'client'
    //  },
    //}

    const project = new codebuild.PipelineProject(this, "MyProject", {
      buildSpec: codebuild.BuildSpec.fromObject(buildSpecObj),
    })

    const buildOutput = new codepipeline.Artifact()
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: "CodeBuild",
      project,
      input: sourceOutput,
      outputs: [buildOutput],
    })

    //deploy stage
    const outputBucket = new s3.Bucket(this, "BuildOutputBucket", {})
    const deployAction = new codepipeline_actions.S3DeployAction({
      actionName: "S3Deploy",
      bucket: outputBucket,
      input: buildOutput,
    })

    new cloudfront.Distribution(this, "myDist", {
      defaultBehavior: {origin: new origins.S3Origin(outputBucket)},
    })

    //complete pipeline
    new codepipeline.Pipeline(this, "MyPipeline", {
      stages: [
        {
          stageName: "Source",
          actions: [sourceAction],
        },
        {
          stageName: "Build",
          actions: [buildAction],
        },
        {
          stageName: "Deploy",
          actions: [deployAction],
        },
      ],
    })
  }
}
