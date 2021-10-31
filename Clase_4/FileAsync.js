const fs = require('fs')

fs.readFile('../package.json', 'utf-8', (err, result) => {
    if (err) throw new Error(`Error en la lectura: ${err}`)

    console.log(`¡Lectura exitosa!`)

    const info = {
        resultString: result,
        resultObj: JSON.parse(result),
        size: result.length,
    }

    fs.writeFile('fileAsync.json', JSON.stringify(info, null, 2), err => {
        if (err) throw new Error(`Error en la escritura: ${err}`)
        console.log('¡Escritura exitosa!')
    })
})
