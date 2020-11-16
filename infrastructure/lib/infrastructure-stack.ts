import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns"
import * as rds from "@aws-cdk/aws-rds"
import * as secretsmanager from "@aws-cdk/aws-secretsmanager"
import * as iam from "@aws-cdk/aws-iam"

require("dotenv").config()

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 3,
      natGateways: 1,
    })

    /* 
        Secrets Setup 

    */

    const dbSecret = new secretsmanager.Secret(this, "Secret")
    const dbPassword = dbSecret.secretValue
    const role = new iam.Role(this, "FargateRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonECSTaskExecutionRolePolicy")],
    })
    dbSecret.grantRead(role)

    /* 

    RDS DATABASE SETUP

    */

    const dbName = process.env.DB_NAME ? process.env.DB_NAME : "postgresDB"
    const dbUsername = process.env.DB_USERNAME ? process.env.DB_USERNAME : "dbUser"
    const dbPort = "5432"

    const dbInstance = new rds.DatabaseInstance(this, "Instance", {
      engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_10}),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE,
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromPassword(dbUsername, dbPassword),
      databaseName: dbName,
    })

    const dbHost = dbInstance.dbInstanceEndpointAddress

    /* 

        Fargate Service

    */
    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
    })

    const securityGroupFargate = new ec2.SecurityGroup(this, `SG-Fargate`, {
      vpc,
    })

    securityGroupFargate.addIngressRule(ec2.Peer.ipv4("0.0.0.0/0"), ec2.Port.tcp(80))

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("../server"),
        taskRole: role,
        secrets: {
          DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret),
        },
        environment: {
          NODE_ENV: "production",
          DB_HOST: dbHost,
          DB_PORT: dbPort,
          DB_NAME: dbName,
          DB_USER: dbUsername,
        },
      },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      securityGroups: [securityGroupFargate],
    })

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/health",
    })

    //loadBalancedFargateService.loadBalancer.loadBalancerDnsName

    /* 

        Bastion Host

    */

    const securityGroupBastion = new ec2.SecurityGroup(this, "bastion-security", {
      vpc,
    })

    securityGroupBastion.addEgressRule(ec2.Peer.ipv4("0.0.0.0/0"), ec2.Port.tcp(80))

    //Bastion Host to access DB
    const host = new ec2.BastionHostLinux(this, "BastionHost", {
      vpc,
      securityGroup: securityGroupBastion,
    })

    //allow connections to db from fargate and bastion host
    dbInstance.connections.allowFrom(securityGroupFargate, ec2.Port.tcp(5432))
    dbInstance.connections.allowFrom(securityGroupBastion, ec2.Port.tcp(5432))
  }
}
