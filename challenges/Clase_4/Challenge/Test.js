const Container = require('./Class')

const document = new Container('products.json')

const object = {
    title: 'Cera líquida Final Shine',
    price: 530,
    thumbnail:
        'https://http2.mlstatic.com/D_NQ_NP_719909-MLA43641288782_102020-O.jpg',
}

const object2 = {
    title: 'Acondicionador Plastic Mate',
    price: 600,
    thumbnail:
        'https://http2.mlstatic.com/D_NQ_NP_731166-MLA45658377147_042021-O.jpg',
}

const object3 = {
    title: 'Shampoo neutro',
    price: 460,
    thumbnail:
        'https://http2.mlstatic.com/D_NQ_NP_691890-MLA45658002282_042021-W.jpg',
}

// document.save(object2)
// document.getById(1)
// document.getAll()
// document.deleteById(2)
// document.deleteAll()
