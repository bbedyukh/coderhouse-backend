const moment = require('moment')
class Dates {
  constructor (birthDay) {
    this.birthDay = birthDay
    this.today = moment()
  }

  getToday () {
    return this.today.format('L')
  }

  getMyBirth () {
    return this.birthDay
  }

  diffYears () {
    return this.today.diff(this.birthDay, 'year', true)
  }

  diffDays () {
    return this.today.diff(this.birthDay, 'days', true)
  }

  diffTime (time) {
    return this.today.diff(this.birthDay, time, true)
  }
}

const birthDay = moment('12/02/1995', 'DD/MM/YYYY')
const Date = new Dates(birthDay)

console.log(Date.getToday())
console.log(Date.getMyBirth())
console.log(Date.diffYears())
console.log(Date.diffDays())
console.log(Date.diffTime('months'))

// const products = [
//     { id: 1, name: 'Escuadra', price: 323.45 },
//     { id: 2, name: 'Calculadora', price: 234.56 },
//     { id: 3, name: 'Globo terráqueo', price: 45.67 },
//     { id: 4, name: 'Paleta pintura', price: 456.78 },
//     { id: 5, name: 'Reloj', price: 67.89 },
//     { id: 6, name: 'Agenda', price: 78.9 },
// ]

// let result = products.reduce((prev, product, i) => {
//     if (i === 0) {
//         return {
//             name: product.name,
//             totalPrice: product.price,
//             lowerPrice: product,
//             higherPrice: product,
//         }
//     } else {
//         let lowerPrice =
//             prev.lowerPrice < product.price ? prev.lowerPrice : product
//         let higherPrice =
//             prev.higherPrice > product.price ? prev.higherPrice : product
//         return {
//             name: prev.name + ', ' + product.name,
//             totalPrice: parseFloat(
//                 (prev.totalPrice + product.price).toFixed(2)
//             ),
//             lowerPrice,
//             higherPrice,
//         }
//     }
// }, {})

// result.average = parseFloat((result.totalPrice / products.length).toFixed(2))
// result
