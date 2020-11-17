import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as codepipeline from "@aws-cdk/aws-codepipeline"
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions"
import * as codebuild from "@aws-cdk/aws-codebuild"
import {Bucket} from "@aws-cdk/aws-s3"

/*
npm run build
npm run export > out folder

*/

require("dotenv").config()

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    //create vpc
    const vpc = new ec2.Vpc(this, "VPC", {
      natGateways: 1,
      maxAzs: 3,
    })

    // Source Stage with github
    const sourceOutput = new codepipeline.Artifact()
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "GitHub_Source",
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      oauthToken: process.env.GITHUB_ACCESS_TOKEN,
      output: sourceOutput,
    })

    //Build Stage with nodejs app
    const project = new codebuild.PipelineProject(this, "MyProject", {
      buildSpec: codebuild.BuildSpec.fromObject({filename: "../buildspec.yml"}),
    })

    const buildOutput = new codepipeline.Artifact()
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: "CodeBuild",
      project,
      input: sourceOutput,
      outputs: [buildOutput],
    })

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
      ],
    })
  }
}
