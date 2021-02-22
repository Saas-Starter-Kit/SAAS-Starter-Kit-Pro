import * as cdk from '@aws-cdk/core';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as iam from '@aws-cdk/aws-iam';

interface SecretsProps extends cdk.StackProps {
  role: iam.IRole;
}

export class SecretsStack extends cdk.Stack {
  public readonly DbSecret: secretsmanager.ISecret;

  constructor(scope: cdk.Construct, id: string, props: SecretsProps) {
    super(scope, id, props);

    const { role } = props;

    const dbSecret = new secretsmanager.Secret(this, 'Secret', {
      generateSecretString: {
        excludeCharacters: '/@" \\\''
      }
    });

    this.DbSecret = dbSecret;
    dbSecret.grantRead(role);
  }
}
