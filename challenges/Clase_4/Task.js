const fs = require('fs')

const writeFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, data)
  } catch (err) {
    throw new Error(`Error en la escritura: ${err.message}`)
  }
}

const readFile = fileName => {
  try {
    const result = fs.readFileSync(fileName, 'utf-8')
    return result
  } catch (err) {
    throw new Error(`Error en la lectura: ${err.message}`)
  }
}

const PERSONS = [
  {
    firstName: 'Bogdan',
    lastName: 'Bedyukh',
    age: 26,
    country: 'Argentina'
  },
  {
    firstName: 'Lucas',
    lastName: 'Camargo',
    age: 26,
    country: 'Uruguay'
  }
]

writeFile('persons.json', JSON.stringify(PERSONS))

const addPerson = person => {
  const fileData = JSON.parse(readFile('persons.json'))
  fileData.push(person)
  writeFile('persons.json', JSON.stringify(fileData))
}

const DIEGO_PERREA = {
  firstName: 'Diego',
  lastName: 'Perea',
  age: 30,
  country: 'Colombia'
}

addPerson(DIEGO_PERREA)

console.log(JSON.parse(readFile('persons.json')))
