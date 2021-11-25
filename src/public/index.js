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
      Swal.fire({
        title: 'Éxito',
        text: json.message,
        icon: 'success',
        timer: 2000
      })
        .then(() => {
          window.location.href = '/'
        })
    })
}
