import request from 'supertest'
import { app } from '../../app'
import { validEmail } from './testData'

describe('GET /api/users/currentuser', () => {
  it('responds with details about the current user', async () => {
    const cookie = await global.signin()

    const response = await request(app)
      .get('/api/users/current')
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(response.body.currentUser.email).toEqual(validEmail)
  })

  it('responds with null if not authenticated', async () => {
    const response = await request(app).get('/api/users/current').send().expect(401)

    expect(response.body.currentUser).toEqual(undefined)
  })
})
