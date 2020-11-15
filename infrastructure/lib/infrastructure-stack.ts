import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 3,
      natGateways: 1,
    })

    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
    })

    // Add capacity to it
    cluster.addCapacity("DefaultAutoScalingGroupCapacity", {
      instanceType: new ec2.InstanceType("t2.micro"),
      desiredCapacity: 1,
    })

    const taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDef")

    const logging = new ecs.AwsLogDriver({
      streamPrefix: "myapp",
    })

    taskDefinition.addContainer("DefaultContainer", {
      image: ecs.ContainerImage.fromAsset("../server"),
      memoryLimitMiB: 512,
      logging,
    })

    const securityGroup = new ec2.SecurityGroup(this, `security-group`, {
      vpc,
    })

    securityGroup.addIngressRule(ec2.Peer.ipv4("0.0.0.0/0"), ec2.Port.tcp(80))

    // Instantiate an Amazon ECS Service
    const ecsService = new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      assignPublicIp: true,
      securityGroups: [securityGroup],
    })
  }
}
