import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

import * as rds from '@aws-cdk/aws-rds';

interface DatabaseProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  dbSecret: secretsmanager.ISecret;
  securityGroupBastion: ec2.ISecurityGroup;
  securityGroupFargate: ec2.ISecurityGroup;
}

export class DatabaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: DatabaseProps) {
    super(scope, id, props);

    const { vpc, dbSecret, securityGroupBastion, securityGroupFargate } = props;

    const dbName = 'postgresDB';
    const dbUsername = 'postgresUser';
    const dbPassword = dbSecret.secretValue;

    const dbInstance = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12 }),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromPassword(dbUsername, dbPassword),
      databaseName: dbName,
      port: 5432
    });

    //dbInstance.dbInstanceEndpointAddress;

    //allow connections to db from fargate and bastion host
    dbInstance.connections.allowFrom(securityGroupFargate, ec2.Port.tcp(5432));
    dbInstance.connections.allowFrom(securityGroupBastion, ec2.Port.tcp(5432));
  }
}
