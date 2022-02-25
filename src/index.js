import twilio from 'twilio'

const client = twilio('AC25278e5fb67a66333fb8beef4028e48d', '5f4a58fc70174458492a25b89bfb0c5f')

client.messages.create({
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5491167609138',
  body: '¡SOY PELIGROSO, RAWR!',
  mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZe8xjSlSEI8a1SK92Jay9sPqJXumdLkVAAg&usqp=CAU'
})
  .then(result => console.log(result))
  .catch(err => console.error(err))
