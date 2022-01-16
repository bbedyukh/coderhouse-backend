let username = ''

const usernameInput = document.getElementById('username')
usernameInput?.addEventListener('keyup', e => {
  if (e.target.value) username = e.target.value
})

document.getElementById("login")?.addEventListener('click', login)

function login(e) {
  e.preventDefault()

  if (!username) {
    window.alert('Fields have not been completed!')
    return
  }

  const data = { username: username }

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      return result.json()
    })
    .then(json => {
      window.location.replace(`${window.location.origin}/home`);
    })
}

const socket = io()
socket.on('welcome', data => console.log(data))

if (window.location.origin + '/home' === window.location.href) {
  fetch('/api/login', {
    method: 'GET'
  })
    .then(result => {
      return result.json()
    })
    .then(json => {
      username = json.payload?.username
      const p = document.getElementById('username')
      p.innerHTML = `Bienvenido <strong>${username}</strong>!`
    })
}

const emailInput = document.getElementById('email')
let email = ''
emailInput?.addEventListener('keyup', e => {
  if (e.target.value) email = e.target.value
})

const firstNameInput = document.getElementById('firstName')
let firstName = ''
firstNameInput?.addEventListener('keyup', e => {
  if (e.target.value) firstName = e.target.value
})

const lastNameInput = document.getElementById('lastName')
let lastName = ''
lastNameInput?.addEventListener('keyup', e => {
  if (e.target.value) lastName = e.target.value
})

const ageInput = document.getElementById('age')
let age = ''
ageInput?.addEventListener('keyup', e => {
  if (e.target.value) age = e.target.value
})

const aliasInput = document.getElementById('alias')
let alias = ''
aliasInput?.addEventListener('keyup', e => {
  if (e.target.value) alias = e.target.value
})

const avatarInput = document.getElementById('avatar')
let avatar = ''
avatarInput?.addEventListener('keyup', e => {
  if (e.target.value) avatar = e.target.value
})

const messageInput = document.getElementById('message')
let message = ''
messageInput?.addEventListener('keyup', e => {
  if (e.target.value) message = e.target.value
})

document.addEventListener('submit', sendForm)

function sendForm(e) {
  e.preventDefault()

  const data = {
    id: email,
    firstName: firstName,
    lastName: lastName,
    age: age,
    alias: alias,
    avatar: avatar,
    message: message
  }

  if (!email || !firstName || !lastName || !age || !alias || !avatar || !message) {
    window.alert('Fields have not been completed!')
    return
  }

  fetch('/api/chats', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      return result.json()
    })
    .then(json => {
      socket.emit('chats')
    })
}

socket.on('chats', data => {
  const divChat = document.getElementById('chats')
  const message = data.map(chat => {
    return `<div class='d-flex align-items-center flex-wrap p-2'>
            <img src='${chat.user.avatar}' class='rounded pe-2' style='height: 45px; width: auto;' /><span style='color: blue; font-weight: 600;'>${chat.user.id}</span> [<span style='color: brown;'>${formatISODate(chat.createdAt)}</span>]: <span style='color: green;font-style: italic;'>${chat.text}</span>
          </div>`
  }).join('')
  divChat.innerHTML = message
})

function formatISODate(date) {
  if (!date) return
  const DATE = date.split('T')[0]
  const HOUR = date.split('T')[1]
  return DATE + ' ' + HOUR.substring(0, 8)
}

document.getElementById("logout")?.addEventListener('click', logout)

function logout() {
  fetch('/api/logout', {
    method: 'POST'
  })
    .then(result => {
      return result.json()
    })
    .then(json => {
      if (json.status === 'success') {
        username = json.payload.username
        window.location.replace(`${window.location.origin}/logout`)
      } else {
        console.error('No se ha podido cerrar la sesión.')
      }
    })
}

if (window.location.origin + '/logout' === window.location.href) {
  const h1 = document.getElementById("logout-title")
  h1.innerText = `Hasta luego ${username}`
}


