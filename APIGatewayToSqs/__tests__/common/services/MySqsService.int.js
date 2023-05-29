const MySqsService = require('../../../src/common/services/MySqsService')

describe('My Sqs service', () => {
  it('should send message to the queue', async () => {
    // GIVEN
    const service = new MySqsService()
    const message = {
      a: 6,
      b: 6,
      text: 'Serverless is AWSome'
    }

    // WHEN
    const actual = await service.sendMessage(message)

    // THEN
    expect(actual).toBeTruthy()
  })
})
