import request from 'supertest'
import { app } from '../../app'
import { validEmail, validPassword, invalidEmail, invalidPassword } from './testData'

describe('POST /api/users/signup', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(201)
  })

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: invalidEmail,
        password: validPassword,
      })
      .expect(400)
  })

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: invalidPassword,
      })
      .expect(400)
  })

  it('returns a 400 with missing email and password', async () => {
    return request(app).post('/api/users/signup').send({}).expect(400)
  })

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(201)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(400)
  })

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
