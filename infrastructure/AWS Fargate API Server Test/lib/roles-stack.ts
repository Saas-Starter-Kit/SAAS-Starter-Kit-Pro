import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class RolesStack extends cdk.Stack {
  public readonly FargateRole: iam.IRole;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fargateRole = new iam.Role(this, 'FargateRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')
      ]
    });

    this.FargateRole = fargateRole;
  }
}
