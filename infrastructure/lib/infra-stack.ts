import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment'

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
  }
}
