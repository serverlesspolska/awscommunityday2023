const middy = require('@middy/core')
const validator = require('@middy/validator')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const log = require('serverless-logger')(__filename)

const MySqsService = require('../common/services/MySqsService')

const handler = async (event) => {
  log('Starting Lambda function')
  log(event)
  const mySqsService = new MySqsService()
  return mySqsService.sendMessage(event.body)
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['a', 'b', 'text'],
      properties: {
        a: { type: 'number' },
        b: { type: 'number' },
        text: { type: 'string' }
      }
    }
  }
}

module.exports.handler = middy(handler)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler())
