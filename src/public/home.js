let isLoading = false
fetch('/api/current')
  .then(result => {
    if (result.status !== 200) location.replace('signin.html')
    return result.json()
  })
  .then(response => {
    document.getElementById('avatar').setAttribute('src', response.avatar)
    document.getElementById('email').innerText = response.email
    document.getElementById('role').innerText = response.role
    fetchCategories()
    fetchProducts()
  })

document.getElementById('logout').addEventListener('click', (e) => {
  fetch('/api/logout', {
    method: 'POST'
  })
    .then(result => {
      if (result.status === 200) location.replace('signin.html')
    })
})

const fetchCategories = () => {
  fetch('/api/categories')
    .then(result => result.json())
    .then(response => {
      let items = ''
      response.categories.forEach(category => {
        items += `<li><a class="dropdown-item">${category.name}</a></li>`
      })
      document.getElementById('categoriesMenu').innerHTML = items
    })
}

const fetchProducts = () => {
  isLoading = true
  fetch('/api/products')
    .then(result => result.json())
    .then(response => {
      let cards = ''

      response.products.forEach(product => {
        cards += `<div class="card" style="width: 18rem;">
        <img src="${product.picture}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <a href="#" class="btn btn-primary">Add to cart</a>
        </div>
      </div>`
      })
      document.getElementById('products').innerHTML = cards
    })
    .finally(() => {
      isLoading = false
    })
}
