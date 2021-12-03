const socket = io()

socket.on('welcome', data => {
  console.log(data.message)
})

const emailInput = document.getElementById('email')
let email = ''
emailInput.addEventListener('keyup', e => {
  if (e.target.value) email = e.target.value
})
const messageInput = document.getElementById('message')
let message = ''
messageInput.addEventListener('keyup', e => {
  if (e.target.value) message = e.target.value
})

const sendChatButton = document.getElementById('sendChatButton')

sendChatButton.addEventListener('click', e => {
  e.preventDefault()
  if (!email || !message) window.alert('Field email or message is empty!')
  const date = new Date()
  const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  socket.emit('chat', { email: email, date: formatedDate, message: message })
})

socket.on('chat', data => {
  const divChat = document.getElementById('chat')
  const chat = data.map(chat => {
    return `<p>
            <span style='color: blue; font-weight: 600;'>${chat.email}</span> [<span style='color: brown;'>${chat.date}</span>]: <span style='color: green;font-style: italic;'>${chat.message}</span>
          </p>`
  }).join('')
  divChat.innerHTML = chat
})

document.addEventListener('submit', sendForm)

function sendForm (e) {
  e.preventDefault()
  const form = document.getElementById('products')
  const data = new FormData(form)
  fetch('/api/products', {
    method: 'POST',
    body: data
  })
    .then(result => {
      return result.json()
    })
    .then(json => {
      const product = json.payload
      socket.emit('products', { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })
      form.reset()
    })
}

socket.on('products', data => {
  const tableBody = document.getElementById('tableBody')
  let products = ''

  if (Object.keys(data).length > 0) {
    products = data.map(product => {
      return `<tr>
            <th scope="row">${product.id}</th>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>
              <a href=${product.thumbnail} target="_blank">
                <img src=${product.thumbnail} alt=${product.thumbnail} class="rounded" style="width: auto; height: 30px;">
              </a>
            </td>
          </tr>`
    }).join('')
  }
  tableBody.innerHTML = products
})
