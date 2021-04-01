import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';

require('dotenv').config();

export class CICDStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Get Github access token
    const secretGithub = secretsmanager.Secret.fromSecretAttributes(this, 'ImportedSecret', {
      secretArn: `arn:aws:secretsmanager:us-east-1:867137601660:secret:/github-access-token-NuotsR`
    });
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
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3
      },
      environmentVariables: {
        GATSBY_SERVER_URL: { value: process.env.GATSBY_SERVER_URL },

        GATSBY_FIREBASE_API_KEY: { value: process.env.GATSBY_FIREBASE_API_KEY },
        GATSBY_FIREBASE_AUTH_DOMAIN: { value: process.env.GATSBY_FIREBASE_AUTH_DOMAIN },

        GATSBY_PRISMIC_REPO_NAME: { value: process.env.GATSBY_PRISMIC_REPO_NAME },
        GATSBY_GOOGLE_ANALYTICS_ID: { value: process.env.GATSBY_GOOGLE_ANALYTICS_ID },
        GATSBY_SENTRY_DNS: { value: process.env.GATSBY_SENTRY_DNS },

        GATSBY_ALGOLIA_APP_ID: { value: process.env.GATSBY_ALGOLIA_APP_ID },
        GATSBY_ALGOLIA_INDEX_NAME: { value: process.env.GATSBY_ALGOLIA_INDEX_NAME },
        GATSBY_ALGOLIA_SEARCH_KEY: { value: process.env.GATSBY_ALGOLIA_SEARCH_KEY },
        GATSBY_ALGOLIA_ADMIN_KEY: { value: process.env.GATSBY_ALGOLIA_ADMIN_KEY },
        GATSBY_DISQUS_SHORTNAME: { value: process.env.GATSBY_DISQUS_SHORTNAME },

        GATSBY_STRIPE_BASIC_PLAN: { value: process.env.GATSBY_STRIPE_BASIC_PLAN },
        GATSBY_STRIPE_BASIC_PLAN_PRICE: { value: process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE },
        GATSBY_STRIPE_BASIC_PLAN_TYPE: { value: process.env.GATSBY_STRIPE_BASIC_PLAN_TYPE },
        GATSBY_STRIPE_PREMIUM_PLAN: { value: process.env.GATSBY_STRIPE_PREMIUM_PLAN },
        GATSBY_STRIPE_PREMIUM_PLAN_PRICE: { value: process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE },
        GATSBY_STRIPE_PREMIUM_PLAN_TYPE: { value: process.env.GATSBY_STRIPE_PREMIUM_PLAN_TYPE },
        GATSBY_STRIPE_PUBLIC_KEY: { value: process.env.GATSBY_STRIPE_PUBLIC_KEY }
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

    new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: { origin: new origins.S3Origin(outputBucket) }
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
