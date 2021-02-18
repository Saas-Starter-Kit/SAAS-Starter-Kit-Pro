#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkFargateStack } from '../lib/aws_cdk_fargate-stack';

const app = new cdk.App();
new AwsCdkFargateStack(app, 'AwsCdkFargateStack');
