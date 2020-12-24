import { Router } from 'express'
import { parseISO, startOfHour } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  return response.status(200).json(appointmentsRepository.list())
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDate = startOfHour(parseISO(date))

  const isAppointmentBooked = appointmentsRepository.findByDate(parsedDate)

  if (isAppointmentBooked) {
    return response.status(400).json({ message: 'This hour is already booked' })
  }

  const appointment = appointmentsRepository.create(provider, parsedDate)

  return response.status(201).json(appointment)
})

export default appointmentsRouter
