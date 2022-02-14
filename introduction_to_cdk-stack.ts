import {
        Stack,
        StackProps,
        aws_lambda as lambda,
        aws_dynamodb as ddb,
        aws_dynamodb,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IntrocutionToCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ddbUsersTable = new ddb.Table(this, 'Users', {
            tableName: 'users',
            partitionKey: {
                    name: 'uid',
                    type: aws_dynamodb.AttributeType.STRING
            }
    })

    //https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html
    const fn = new lambda.Function(this,'IntroductionToCdkFunction',{
            //runtime: lambda.Runtime.PROVIDED_AL2,
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(
                    './Lambda-NodeJS14-default.zip'
            ),
            architecture: lambda.Architecture.X86_64,
    })

    ddbUsersTable.grantWriteData(fn)
  }
}
