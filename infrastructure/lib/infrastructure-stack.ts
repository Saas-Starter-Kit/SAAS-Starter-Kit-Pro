import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns"
import * as rds from "@aws-cdk/aws-rds"

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 3,
      natGateways: 1,
    })

    //Bastion Host to access DB
    const host = new ec2.BastionHostLinux(this, "BastionHost", {vpc})

    /* 

        Fargate Service

    */
    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
    })

    const securityGroupFargate = new ec2.SecurityGroup(this, `security-group`, {
      vpc,
    })

    securityGroupFargate.addIngressRule(ec2.Peer.ipv4("0.0.0.0/0"), ec2.Port.tcp(80))

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster,
      cpu: 512,
      taskImageOptions: {image: ecs.ContainerImage.fromAsset("../server")},
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      securityGroups: [securityGroupFargate],
    })

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/health",
    })

    /* 

    RDS DATABASE SETUP

    */

    const db_name = "postgresDB"
    const db_username = "DBadmin"

    const dbInstance = new rds.DatabaseInstance(this, "Instance", {
      engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_10}),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE,
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromGeneratedSecret(db_username),
      databaseName: db_name,
    })

    dbInstance.connections.allowFrom(securityGroupFargate, ec2.Port.tcp(5432))
  }
}
