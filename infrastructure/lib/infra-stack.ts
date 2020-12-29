import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment'
import { Distribution, OriginProtocolPolicy } from '@aws-cdk/aws-cloudfront';
import { S3Origin, HttpOrigin } from '@aws-cdk/aws-cloudfront-origins';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';


export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket + Contents
    const websiteBucket = new Bucket(this, 's3bucket', {
      bucketName: 'tripp-horbinski',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true
    })

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('../my-website/build')],
      destinationBucket: websiteBucket
    });

    // Lambda + API Gateway
    const vedaHandler = new Function(this, 'veda-lambda', {
      runtime: Runtime.PYTHON_3_8,
      handler: 'veda.lambda_handler',
      code: Code.fromAsset(path.join(__dirname, 'veda.zip')),
    })

    const api = new RestApi(this, 'veda-api');
    const baseUrl = `https://${api.restApiId}.execute-api.${this.region}.amazonaws.com/prod`
    api.root.addResource('veda').addMethod('GET', new LambdaIntegration(vedaHandler))

    new cdk.CfnOutput(this, 'veda-url', {
      value: `${baseUrl}/veda`,
    });

    // CloudFront Distribution
    new Distribution(this, 'myDist', {
      defaultBehavior: { origin: new S3Origin(websiteBucket) }
    });
  }
}
