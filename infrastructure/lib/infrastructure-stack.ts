import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns"

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

    // Create a load-balanced Fargate service and make it public
    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster,
      desiredCount: 1,
      taskImageOptions: {image: ecs.ContainerImage.fromAsset("../server")},
      publicLoadBalancer: true,
    })

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/custom-health-path",
    })
  }
}
