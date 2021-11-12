const fs = require('fs')

class Container {
  constructor (name) {
    this.name = name
  }

  save (object) {
    fs.readFile(this.name, 'utf-8', (err, result) => {
      try {
        if (!object) throw new Error('Missing \'object\' parameter!')
        if (err) {
          if (err.message.includes('no such file or directory')) {
            console.error(err.message)
            console.log(
              'The file has been created because it does not exist.'
            )
            fs.writeFileSync(this.name, '')
          } else {
            throw new Error(`Read error: ${err}`)
          }
        }

        console.log(`Read from file ${this.name} successful!`)

        let id
        let currentArr = !result ? '' : JSON.parse(result)

        if (!currentArr) {
          currentArr = []
          id = 1
        } else {
          const lastItem = currentArr[currentArr.length - 1]
          id = lastItem.id + 1
        }

        const idFound = currentArr.find(e => e.title === object.title)
        if (idFound) throw new Error('Object already exists.')

        object.id = id
        currentArr.push(object)

        fs.writeFile(this.name, JSON.stringify(currentArr), err => {
          if (err) throw new Error(`Writing error: ${err}`)
          console.log(`Write to file ${this.name} successful!`)
          console.log(`Assigned ID '${object.id}' to object.`)
        })
      } catch (err) {
        console.error(err.message)
      }
    })
  }

  getById (id) {
    fs.readFile(this.name, 'utf-8', (err, result) => {
      try {
        if (!id) throw new Error('Missing \'id\' parameter!')
        if (err) throw new Error(`Read error: ${err}`)

        const currentArr = !result ? '' : JSON.parse(result)
        if (!currentArr) throw new Error('The document is empty!')
        const data = currentArr.find(e => e.id === id)
        if (data) return console.log(data)
        else return console.log('null')
      } catch (err) {
        console.error(err)
      }
    })
  }

  getAll () {
    fs.readFile(this.name, 'utf-8', (err, result) => {
      try {
        if (err) throw new Error(`Read error: ${err}`)

        const currentArr = !result ? '' : JSON.parse(result)
        if (!currentArr) throw new Error('The document is empty!')

        console.log(currentArr)
      } catch (err) {
        console.error(err)
      }
    })
  }

  deleteById (id) {
    fs.readFile(this.name, 'utf-8', (err, result) => {
      try {
        if (!id) throw new Error('Missing \'id\' parameter!')
        if (err) throw new Error(`Read error: ${err}`)

        console.log(`Read from file ${this.name} successful!`)

        const currentArr = !result ? '' : JSON.parse(result)
        if (!currentArr) throw new Error('The document is empty!')

        const idFound = currentArr.find(e => e.id === id)
        if (!idFound) { throw new Error(`ID '${id}' not found in document.`) }

        let newArr = currentArr.filter(e => e.id !== id)
        newArr.length === 0
          ? (newArr = '')
          : (newArr = JSON.stringify(newArr))

        fs.writeFile(this.name, newArr, err => {
          if (err) throw new Error(`Writing error: ${err}`)
          console.log(`The object with ID '${id}' has been removed.`)
        })
      } catch (err) {
        console.error(err.message)
      }
    })
  }

  deleteAll () {
    fs.writeFile(this.name, '', err => {
      try {
        if (err) throw new Error(`Writing error: ${err}`)
        console.log(
                    `¡All objects have been removed from the document ${this.name}!`
        )
      } catch (err) {
        console.error(err.message)
      }
    })
  }
}

module.exports = Container
