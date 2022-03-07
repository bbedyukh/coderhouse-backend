fetch('/api/current')
  .then(result => {
    if (result.status === 200) location.replace('home.html')
  })

const form = document.getElementById('signinForm')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)

  const user = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  if (!user.email || !user.password) {
    window.alert('The fields have to be completed.')
  } else {
    fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        if (result.status === 200) {
          location.replace('home.html')
        } else {
          window.alert(`Error: ${result.message}`)
        }
      })
  }
})
