const products = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo terráqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.9 },
]

const ObjectArrays = array => {
    const names = array.map(e => e.nombre).toString()
    let totalPrice = 0
    array.forEach(e => {
        totalPrice += e.precio
    })
    const averagePrice = totalPrice / array.length
    const prices = array.map(e => e.precio)
    const lowerPrice = Math.min(...prices)
    const higherPrice = Math.max(...prices)

    const twoDecimals = number => parseFloat(number.toFixed(2))

    // console.log(`Nombres de los productos: ${names}`)
    // console.log(`Precio total: ${twoDecimals(totalPrice)}`)
    // console.log(`Precio promedio: ${twoDecimals(averagePrice)}`)
    // console.log(`Producto con menor precio: ${twoDecimals(lowerPrice)}`)
    // console.log(`Producto con mayor precio: ${twoDecimals(higherPrice)}`)

    console.log({
        id: array.length + 1,
        nombres: names,
        totalPrice: twoDecimals(totalPrice),
        averagePrice: twoDecimals(averagePrice),
        lowerPrice: twoDecimals(lowerPrice),
        higherPrice: twoDecimals(higherPrice),
    })
}

ObjectArrays(products)
