const fs = require('fs')

const FILE_NAME = 'fileAsync.json'
fs.promises
  .readFile(FILE_NAME, 'utf-8')
  .then(result => {
    console.log(`¡Lectura del archivo ${FILE_NAME} exitosa!`)
    console.log(JSON.parse(JSON.parse(result).resultString))
    // data.name = 'Clase Nº4 - Promesas'
    fs.promises
      .writeFile('filePromises.txt', data)
      .then(() => console.log('¡Escritura exitosa!'))
      .catch(err => console.error(`Error: ${err}`))
  })
  .catch(err => console.error(`Error: ${err}`))
