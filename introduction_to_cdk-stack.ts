import { 
  Stack, 
  StackProps,
  RemovalPolicy,
  aws_lambda as lambda, 
  aws_iam as iam,
  aws_dynamodb as ddb,
  aws_s3 as s3,
  aws_dynamodb,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');

export class IntroductionToCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ddbUsersTable = new ddb.Table(this, 'Users', {
      tableName: 'users',
      //default is RETAIN, so not delete when "cdk destroy" runs:
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'uid',
        type: aws_dynamodb.AttributeType.STRING
      }
    });

    const fn = new lambda.Function(this, 'IntroductionToCdkFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'IntroCDKv2',
      handler: 'index.handler',
      //see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.InlineCode.html:
      code: lambda.Code.fromAsset(path.join(__dirname, '../assets')),
      architecture: lambda.Architecture.X86_64
    });

    ddbUsersTable.grantReadData(fn)
    ddbUsersTable.grantWriteData(fn)
  }
}
