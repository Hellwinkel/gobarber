import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

class AppointmentsRepository {
  private appointments: Array<Appointment>

  constructor() {
    this.appointments = []
  }

  public list(): Array<Appointment> {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    )

    return findAppointment || null
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date)

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
