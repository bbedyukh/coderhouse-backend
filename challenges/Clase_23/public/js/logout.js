fetch('/api/login')
  .then(result => result.json())
  .then(response => {
    const user = response
    document.getElementById('logout-title').innerHTML = `Hasta luego, <strong>${user.username}</strong>!`
    setTimeout(() => {
      fetch('/api/logout', {
        method: 'POST'
      })
        .then(() => location.replace('/'))
    }, 2000)
  })