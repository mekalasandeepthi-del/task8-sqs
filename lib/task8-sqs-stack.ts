import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Task8SqsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create SQS Queue
    new sqs.Queue(this, 'Task8Queue', {
      queueName: 'task8-queue',
      visibilityTimeout: cdk.Duration.seconds(30),
    });
  }
}