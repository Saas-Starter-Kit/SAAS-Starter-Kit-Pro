import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Stack {
  public readonly VPC: ec2.IVpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* 
        VPC Setup
    */

    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3,
      natGateways: 1
    });

    this.VPC = vpc;
  }
}
