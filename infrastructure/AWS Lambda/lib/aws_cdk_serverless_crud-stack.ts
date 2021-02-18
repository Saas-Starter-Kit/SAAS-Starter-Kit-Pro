import * as cdk from '@aws-cdk/core';
import { LambdaIntegration, Cors, RestApi } from '@aws-cdk/aws-apigateway';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

export class AwsCdkServerlessCrudStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const dynamoTable = new Table(this, 'items', {
      partitionKey: {
        name: 'itemId',
        type: AttributeType.STRING
      },
      tableName: 'items',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const createOne = new NodejsFunction(this, 'createItemFunction', {
      entry: 'Functions/create/create.js',
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName
      }
    });

    const getOneLambda = new NodejsFunction(this, 'getOneItemFunction', {
      entry: 'Functions/get-one/get-one.js',
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName
      }
    });

    const getAllLambda = new NodejsFunction(this, 'getAllItemsFunction', {
      entry: 'Functions/get-all/get-all.js',
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName
      }
    });

    const deleteOne = new NodejsFunction(this, 'deleteItemFunction', {
      entry: 'Functions/delete-one/delete-one.js',
      handler: 'handler',
      environment: {
        TABLE_NAME: dynamoTable.tableName
      }
    });

    dynamoTable.grantReadWriteData(getAllLambda);
    dynamoTable.grantReadWriteData(getOneLambda);
    dynamoTable.grantReadWriteData(createOne);
    dynamoTable.grantReadWriteData(deleteOne);

    const api = new RestApi(this, 'itemsApi', {
      restApiName: 'Items Service',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS // this is also the default
      }
    });

    const items = api.root.addResource('items');
    const getAllIntegration = new LambdaIntegration(getAllLambda);
    items.addMethod('GET', getAllIntegration);

    const createOneIntegration = new LambdaIntegration(createOne);
    items.addMethod('POST', createOneIntegration);

    const singleItem = items.addResource('{id}');
    const getOneIntegration = new LambdaIntegration(getOneLambda);
    singleItem.addMethod('GET', getOneIntegration);

    const deleteOneIntegration = new LambdaIntegration(deleteOne);
    singleItem.addMethod('DELETE', deleteOneIntegration);
  }
}
