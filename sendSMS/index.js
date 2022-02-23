import twilio from 'twilio'

const ACCOUNT_SID = 'AC25278e5fb67a66333fb8beef4028e48d'
const AUTH_TOKEN = '943ad6dda1f649dee8b6d6d11304b74f'

const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

try {
  const message = await client.messages.create({
    body: 'Hello. This a test message with Twilio.',
    from: '+18647023224',
    to: '+541167609138'
  })
  console.log(message)
} catch (err) {
  console.error(err)
}

