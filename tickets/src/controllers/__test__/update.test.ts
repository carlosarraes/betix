import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { natsWrapper } from '../../natsWrapper'

describe('PUT /api/tickets/:id', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'test',
        price: 20,
      })
      .expect(StatusCodes.NOT_FOUND)
  })

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'test',
        price: 20,
      })
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it('returns a 401 if the user doesnt own the ticket', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
      title: 'test',
      price: 20,
    })

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'test',
        price: 20,
      })
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
      title: 'test',
      price: 20,
    })

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 20,
      })
      .expect(StatusCodes.BAD_REQUEST)

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'test',
        price: -20,
      })
      .expect(StatusCodes.BAD_REQUEST)
  })

  it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
      title: 'test',
      price: 20,
    })

    const newTitle = 'new title'
    const newPrice = 100

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: newTitle,
        price: newPrice,
      })
      .expect(StatusCodes.OK)

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()

    expect(ticketResponse.body.title).toEqual(newTitle)
    expect(ticketResponse.body.price).toEqual(newPrice)
  })

  it('publishes an event', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
      title: 'test',
      price: 20,
    })

    const newTitle = 'new title'
    const newPrice = 100

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: newTitle,
        price: newPrice,
      })
      .expect(StatusCodes.OK)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
  })
})
