const log = require('serverless-logger')(__filename)
const SqsAdapter = require('../adapters/SqsAdapter')


module.exports = class MySqsService {
  constructor(sqsAdapter, queueUrl) {
    this.sqsAdapter = sqsAdapter || new SqsAdapter()
    this.queueUrl = queueUrl || process.env.queueUrl
  }

  async sendMessage(message) {
    log('Sending message to SQS')
    const response = await this.sqsAdapter.sendMessage(this.queueUrl, message);
    return response
  }
}
