import request from 'supertest'
import { app } from '../../app'
import { validEmail, validPassword, invalidEmail, invalidPassword } from './testData'

describe('POST /api/users/signin', () => {
  it('returns a 200 and a cookie on successful signin', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(201)

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
  })

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: invalidEmail,
        password: validPassword,
      })
      .expect(400)
  })

  it('returns a 400 with an invalid password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(201)

    await request(app)
      .post('/api/users/signin')
      .send({
        email: validEmail,
        password: invalidPassword,
      })
      .expect(400)
  })
})
