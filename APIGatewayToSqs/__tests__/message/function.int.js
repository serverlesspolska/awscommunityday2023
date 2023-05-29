const { default: axios } = require('axios')

axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('createItem function', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    const payload = {
      a: 5,
      b: 5,
      text: 'Everything is Awesome!'
    }

    // WHEN
    const actual = await axios.post('/message', payload)

    // THEN
    expect(actual.status).toBe(200)
  })

  it('should respond with Bad Request 400 to incorrect request', async () => {
    // GIVEN
    const wrongPayload = {
      a: 'Serverless',
      b: 'is',
      text: 'Awesome!'
    }

    // WHEN
    let actual
    try {
      await axios.post('/message', wrongPayload)
    } catch (e) {
      actual = e.response
    }

    // THEN
    expect(actual.status).toBe(400)
    expect(actual.statusText).toBe('Bad Request')
  })
})
