const SqsAdapter = require('../../../src/common/adapters/SqsAdapter')

describe('Sqs Adapter', () => {
  it('should send message to a queue', async () => {
    // GIVEN
    const client = new SqsAdapter()
    const { queueUrl } = process.env
    const message = {
      a: 1,
      b: 2,
      text: 'Serverless is AWSome'
    }

    // WHEN
    const results = await client.sendMessage(queueUrl, message)

    // THEN
    expect(results).toBeTruthy()
  })
})
