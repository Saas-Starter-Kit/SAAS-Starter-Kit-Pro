import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as path from 'path';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

interface ComputeProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  dbSecret: secretsmanager.ISecret;
  role: iam.IRole;
}

export class ComputeStack extends cdk.Stack {
  public readonly SecurityGroupFargate: ec2.ISecurityGroup;
  public readonly SecurityGroupBastion: ec2.ISecurityGroup;

  constructor(scope: cdk.Construct, id: string, props: ComputeProps) {
    super(scope, id, props);

    const { vpc, role, dbSecret } = props;

    /* 
        Fargate Service
    */

    const securityGroupFargate = new ec2.SecurityGroup(this, `SG-Fargate`, {
      vpc
    });

    securityGroupFargate.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(80));

    this.SecurityGroupFargate = securityGroupFargate;

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc
    });

    const dbName = 'postgresDB';
    const dbUsername = 'postgresUser';
    const dbPort = '5432';
    const dbHost = 'di1u2ugo64n9ihp.cbjw4ykutut4.us-east-1.rds.amazonaws.com';

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      'MyFargateService',
      {
        cluster: cluster,
        cpu: 512,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(path.join(__dirname, '..', '..', '..', 'server')),
          taskRole: role,
          secrets: {
            DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret)
          },
          environment: {
            NODE_ENV: 'production',
            DB_HOST: dbHost,
            DB_PORT: dbPort,
            DB_NAME: dbName,
            DB_USER: dbUsername
          }
        },
        memoryLimitMiB: 2048,
        publicLoadBalancer: true,
        securityGroups: [securityGroupFargate]
      }
    );

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: '/health'
    });

    /* 
        Bastion Host
    */

    let securityGroupBastion = new ec2.SecurityGroup(this, 'bastion-security', {
      vpc
    });

    securityGroupBastion.addEgressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(80));

    this.SecurityGroupBastion = securityGroupBastion;

    //Bastion Host to access DB
    new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc,
      securityGroup: securityGroupBastion
    });
  }
}
