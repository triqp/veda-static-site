# veda-static-site
[Visit the S3 static website!](http://tripp-horbinski.s3-website-us-east-1.amazonaws.com/)
[Visit the CloudFront site with an S3 origin](http://d2we23hvwuip6v.cloudfront.net/)
[Visit API Gateway](https://ydb1y5phlf.execute-api.us-east-1.amazonaws.com/prod/veda)

Deploys a [Docusaurus Static Site](https://v2.docusaurus.io/) to an S3 Bucket, enables static webssite hosting and public access to it.

Note: This project is designed for deploying to an AWS account from a local environment. For production use, please consider setting up a CICD pipeline with an appropriate IAM role to deploy following industry best-practices.

## Local Development
For ease of use, a Makefile has been included. 
```bash
# Install all project dependencies
make install

# Generate the static site, optimized to release to production
make build-site

# Run infrastructure unit tests to validate expected resources and properties exist
make test-stack

# Generate the infrastructure CloudFormation template
make generate-stack

# Deploy the infrastructure CloudFormation template
make deploy-stack
```

**Future improvement:** use in conjuction with Docker to keep project dependencies up-to-date across development environments, as well as for CICD pipeline use.