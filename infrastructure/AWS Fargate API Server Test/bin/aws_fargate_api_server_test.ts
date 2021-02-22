#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';
import { RolesStack } from '../lib/roles-stack';
import { SecretsStack } from '../lib/secrets-stack';
import { ComputeStack } from '../lib/compute-stack';
import { DatabaseStack } from '../lib/database-stack';

const app = new cdk.App();

const Vpc = new VpcStack(app, 'VpcStack');
const Roles = new RolesStack(app, 'RolesStack');
const Secrets = new SecretsStack(app, 'SecretsStack', { role: Roles.FargateRole });

const Compute = new ComputeStack(app, 'ComputeStack', {
  vpc: Vpc.VPC,
  dbSecret: Secrets.DbSecret,
  role: Roles.FargateRole
});

const Database = new DatabaseStack(app, 'DatabaseStack', {
  vpc: Vpc.VPC,
  dbSecret: Secrets.DbSecret,
  securityGroupBastion: Compute.SecurityGroupBastion,
  securityGroupFargate: Compute.SecurityGroupFargate
});
