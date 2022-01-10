const socket = io()

const emailInput = document.getElementById('email')
let email = ''
emailInput.addEventListener('keyup', e => {
  if (e.target.value) email = e.target.value
})

const firstNameInput = document.getElementById('firstName')
let firstName = ''
firstNameInput.addEventListener('keyup', e => {
  if (e.target.value) firstName = e.target.value
})

const lastNameInput = document.getElementById('lastName')
let lastName = ''
lastNameInput.addEventListener('keyup', e => {
  if (e.target.value) lastName = e.target.value
})

const ageInput = document.getElementById('age')
let age = ''
ageInput.addEventListener('keyup', e => {
  if (e.target.value) age = e.target.value
})

const aliasInput = document.getElementById('alias')
let alias = ''
aliasInput.addEventListener('keyup', e => {
  if (e.target.value) alias = e.target.value
})

const avatarInput = document.getElementById('avatar')
let avatar = ''
avatarInput.addEventListener('keyup', e => {
  if (e.target.value) avatar = e.target.value
})

const messageInput = document.getElementById('message')
let message = ''
messageInput.addEventListener('keyup', e => {
  if (e.target.value) message = e.target.value
})

// const sendChatButton = document.getElementById('sendChatButton')

// sendChatButton.addEventListener('click', e => {
//   e.preventDefault()
//   const date = new Date()
//   const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//   socket.emit('chat', { email: email, date: formatedDate, message: message })
// })

document.addEventListener('submit', sendForm)

function sendForm (e) {
  e.preventDefault()
  console.log(e)
  if (!email || !firstName || !lastName || !age || !alias || !avatar || !message) {
    window.alert('Fields have not been completed!')
  }
  const form = document.getElementById('messagesCenter')
  const data = new FormData(form)
  fetch('/api/chat', {
    method: 'POST',
    body: data
  })
    .then(result => {
      console.log(result)
    })
    // .then(json => {
    //   const product = json.payload
    //   socket.emit('chats', { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })
    // })
}

socket.on('chat', data => {
  const divChat = document.getElementById('chat')
  const chat = data.map(chat => {
    return `<p>
            <span style='color: blue; font-weight: 600;'>${chat.email}</span> [<span style='color: brown;'>${chat.date}</span>]: <span style='color: green;font-style: italic;'>${chat.message}</span>
          </p>`
  }).join('')
  divChat.innerHTML = chat
})
