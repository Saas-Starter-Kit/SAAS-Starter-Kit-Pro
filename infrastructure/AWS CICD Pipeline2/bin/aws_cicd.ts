#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "@aws-cdk/core"
import {CICDStack} from "../lib/aws_cicd_stack"

const envUSA = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
}

const app = new cdk.App()
new CICDStack(app, "CICD", {env: envUSA})
