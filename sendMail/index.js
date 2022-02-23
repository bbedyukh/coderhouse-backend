import { createTransport } from 'nodemailer'

const appPwd = 'nmlehuaqbfbzktmr'
const userMail = 'bedyukhedits@gmail.com'

const transport = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: userMail,
    pass: appPwd
  },
})

const mail = {
  from: `Mail test <${userMail}>`,
  to: 'ing_mauricioespinosa@hotmail.com',
  subject: 'A subject test',
  html: `
  <h1>⭐⭐⭐⭐⭐</h1>
  <h2>Mail no spam.</h2>
  <br />
  <img src="https://res.cloudinary.com/hdsqazxtw/image/upload/v1570710978/coderhouse.jpg" />
  `,
  attachments: {
    path: 'coderhouse.jpg'
  }
}

try {
  const result = await transport.sendMail(mail)
  console.log(result)
} catch (err) {
  console.error(err)
}