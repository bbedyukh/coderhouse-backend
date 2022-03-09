import { createTransport } from 'nodemailer'
import { MAILER_AUTH } from '../config/config.js'

export default class MailService {
  constructor () {
    this.transport = createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: MAILER_AUTH.USER,
        pass: MAILER_AUTH.PASSWORD
      }
    })
  }

  async sendMail (subject, html) {
    await this.transport.sendMail({
      from: 'Gläzen App <app@glazen.com>',
      to: MAILER_AUTH.USER,
      subject,
      html
    })
  }
}
