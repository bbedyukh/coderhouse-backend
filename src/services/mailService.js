import { createTransport } from 'nodemailer'
import { MAILER_AUTH } from '../config/config.js'

export const transport = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: MAILER_AUTH.USER,
    pass: MAILER_AUTH.PASSWORD
  }
})

export const mail = (user) => {
  return {
    from: 'Gläzen App <app@glazen.com>',
    to: MAILER_AUTH.USER,
    subject: 'New register!',
    html: `
  <h1>You have successfully registered.</h1>

  Remember your data.<br /><br />

  <span><strong>Firstname: </strong> ${user.firstName}</span><br />
  <span><strong>Lastname: </strong> ${user.lastName}</span><br />
  <span><strong>Email: </strong> ${user.email}</span><br />
  <span><strong>Password: </strong> <u>For security it cannot be displayed</u>.</span><br />
  <span><strong>Username: </strong> ${user.username}</span><br />
  <span><strong>Phone: </strong> ${user.phone}</span><br />
  <span><strong>Address: </strong> ${user.address}</span><br />
  <span><strong>Age: </strong> ${user.age}</span><br />
  <span><strong>Avatar: </strong> <a href="${user.avatar}">${user.avatar}</a></span><br />
  <span><strong>Role: </strong> ${user.role.name}</span><br /><br />

  Thank you,<br />
  See you!
  `
  }
}
