import request from 'supertest'
import { app } from '../../app'
import { StatusCodes } from 'http-status-codes'
import { Ticket } from '../../models'

describe('POST /api/tickets', () => {
  it('has a route handler listening to /api/tickets for POST requests', async () => {
    const response = await request(app).post('/api/tickets').send({
      title: 'Title',
      price: 10,
    })

    expect(response.status).not.toEqual(StatusCodes.NOT_FOUND)
  })

  it('can only be accessed if the user is signed in', async () => {
    await request(app)
      .post('/api/tickets')
      .send({
        title: 'Title',
        price: 10,
      })
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({})

    expect(response.status).not.toEqual(StatusCodes.UNAUTHORIZED)
  })

  it('retruns an error if an invalid title is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: '', price: 10 })
      .expect(StatusCodes.BAD_REQUEST)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ price: 10 })
      .expect(StatusCodes.BAD_REQUEST)
  })

  it('retruns an error if an invalid price is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Title', price: -10 })
      .expect(StatusCodes.BAD_REQUEST)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Title' })
      .expect(StatusCodes.BAD_REQUEST)
  })

  it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'Title', price: 10 })
      .expect(StatusCodes.CREATED)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
  })
})
