const AWS = require('aws-sdk')
const log = require('serverless-logger')(__filename)

module.exports = class SqsAdapter {
  constructor() {
    this.client = new AWS.SQS({
      region: process.env.region
    })
  }

  async sendMessage(QueueUrl, message) {

    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl
    }
    const response = await this.client.sendMessage(params).promise();
    return response
  }
}