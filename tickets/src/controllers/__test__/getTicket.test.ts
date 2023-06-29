import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

describe('GET /api/tickets/:id', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app).get(`/api/tickets/${id}`).expect(StatusCodes.NOT_FOUND)
  })

  it('returns the ticket if the ticket is found', async () => {
    const title = 'Title'
    const price = 10

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title, price })
      .expect(StatusCodes.CREATED)

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .expect(StatusCodes.OK)

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
  })
})
