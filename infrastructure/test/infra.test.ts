import { expect as expectCDK, matchTemplate, MatchStyle, haveResource, arrayWith, objectLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Infra from '../lib/infra-stack';

test('S3 Bucket configured for static site', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infra.InfraStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource('AWS::S3::Bucket', {
      BucketName: 'tripp-horbinski',
      WebsiteConfiguration: {
        ErrorDocument: "404.html",
        IndexDocument: "index.html"
      }
    }))

    expectCDK(stack).to(haveResource('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: [
          objectLike({
            Action: "s3:GetObject"
          })
        ],
        Version: "2012-10-17"
      }
    }))
});

test('S3 deployment exists', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infra.InfraStack(app, 'MyTestStack');
  // THEN
  console.log(stack)
  expectCDK(stack).to(haveResource('Custom::CDKBucketDeployment'))
});
