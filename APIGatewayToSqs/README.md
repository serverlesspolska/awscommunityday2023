Compare Lambda vs _functionless_ implementation of an API Gateways to SQS use case.

## Functionless approach uses:
* [serverless-apigateway-service-proxy](https://github.com/serverless-operations/serverless-apigateway-service-proxy) - plugin
* and some CloudFormation for Schema Validation


## Lambda approach uses:
* [serverless-hexagonal-template](https://github.com/serverlesspolska/serverless-hexagonal-template) as a template
* [middy](https://github.com/middyjs/middy) - for handling Lambda payload and validation
