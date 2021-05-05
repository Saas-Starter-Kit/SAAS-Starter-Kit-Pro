import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as acm from '@aws-cdk/aws-certificatemanager';

require('dotenv').config();

export class CICDStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Get Github access token
    let secretArn = process.env.GITHUB_SECRET_ARN ? process.env.GITHUB_SECRET_ARN : '';
    const secretGithub = secretsmanager.Secret.fromSecretCompleteArn(
      this,
      'SecretFromCompleteArn',
      secretArn
    );

    const roleCodeBuild = new iam.Role(this, 'CodeBuildRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
    });

    secretGithub.grantRead(roleCodeBuild);

    // Source Stage with github
    const owner = process.env.GITHUB_OWNER ? process.env.GITHUB_OWNER : 'GithubOwner';
    const repo = process.env.GITHUB_REPO ? process.env.GITHUB_REPO : 'Repo';
    const oauthToken = secretGithub.secretValueFromJson('GITHUB_ACCESS_TOKEN');

    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner,
      repo,
      oauthToken,
      branch: 'main',
      output: sourceOutput
    });

    const project = new codebuild.PipelineProject(this, 'MyProject', {
      buildSpec: codebuild.BuildSpec.fromSourceFilename('client/buildspec.yml'),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0
      },
      environmentVariables: {
        GATSBY_SERVER_URL: { value: process.env.GATSBY_SERVER_URL },
        NEXT_PUBLIC_SERVER_URL: { value: process.env.NEXT_PUBLIC_SERVER_URL },
        NEXT_PUBLIC_FIREBASE_API_KEY: { value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: { value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: { value: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID },
        NEXT_PUBLIC_STRIPE_BASIC_PLAN: { value: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN },
        NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE: {
          value: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE
        },
        NEXT_PUBLIC_STRIPE_BASIC_PLAN_TYPE: {
          value: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_TYPE
        },
        NEXT_PUBLIC_STRIPE_PREMIUM_PLAN: { value: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN },
        NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE: {
          value: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE
        },
        NEXT_PULBIC_STRIPE_PREMIUM_PLAN_TYPE: {
          value: process.env.NEXT_PULBIC_STRIPE_PREMIUM_PLAN_TYPE
        },
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY: { value: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY }
      }
    });

    const buildOutput = new codepipeline.Artifact();
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project,
      input: sourceOutput,
      outputs: [buildOutput]
    });

    //deploy stage
    const cors_rules: [s3.CorsRule] = [
      { allowedOrigins: ['*'], allowedMethods: [s3.HttpMethods.GET] }
    ];
    const outputBucket = new s3.Bucket(this, 'BuildOutputBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      //removalPolicy: cdk.RemovalPolicy.DESTROY,
      cors: cors_rules
    });
    const deployAction = new codepipeline_actions.S3DeployAction({
      actionName: 'S3Deploy',
      bucket: outputBucket,
      input: buildOutput
    });

    //AWS Certificate Manager
    //Requires Setup in Console First
    //See docs for more info
    //let certifcateArn = process.env.CERT_ARN ? process.env.CERT_ARN : '';
    //const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', certifcateArn);

    new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: {
        origin: new origins.S3Origin(outputBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      //certificate,
      domainNames: ['www.example.com']
    });

    //complete pipeline
    new codepipeline.Pipeline(this, 'MyPipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction]
        },
        {
          stageName: 'Build',
          actions: [buildAction]
        },
        {
          stageName: 'Deploy',
          actions: [deployAction]
        }
      ]
    });
  }
}
