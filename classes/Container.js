const fs = require('fs')

class Container {
    constructor(name) {
        this.name = name
    }

    // save = async object => {
    //     try {
    //         if (!object) throw new Error(`Missing 'object' parameter!`)
    //         const readFile = await fs.promises.readFile(this.name, 'utf-8')
    //         console.log(`Read from file ${this.name} successful!`)

    //         let id = 1
    //         const currentArr = !readFile ? [] : JSON.parse(readFile)

    //         if (currentArr.length > 1) {
    //             let lastItem = currentArr[currentArr.length - 1]
    //             id = lastItem.id + 1
    //         }

    //         const idFound = currentArr.find(e => e.title === object.title)
    //         if (idFound) throw new Error(`Object already exists.`)

    //         object.id = id
    //         currentArr.push(object)

    //         await fs.promises.writeFile(this.name, JSON.stringify(currentArr))
    //         console.log(`Write to file ${this.name} successful!`)
    //         console.log(`Assigned ID '${object.id}' to object.`)
    //     } catch (err) {
    //         if (err.code === 'ENOENT') {
    //             try {
    //                 await fs.promises.writeFile(this.name, '')
    //                 console.log('Se creo archivo.')
    //             } catch (err) {
    //                 console.log(`Error to created file. ${err}`)
    //             }
    //         } else console.error(`Error save file: ${err.message}`)
    //     }
    // }

    getById = async id => {
        try {
            if (!id) throw new Error(`Missing 'id' parameter!`)
            const readFile = await fs.promises.readFile(this.name, 'utf-8')

            let currentArr = !readFile ? '' : JSON.parse(readFile)
            if (!currentArr) throw new Error(`The document is empty!`)

            const data = currentArr.find(e => e.id === id)
            if (!data) throw new Error(`null`)
            return data
        } catch (err) {
            console.log(`Read file error: ${err.message}`)
        }
    }

    // getAll = async () => {
    //     try {
    //         const readFile = await fs.promises.readFile(this.name, 'utf-8')
    //         let currentArr = !readFile ? '' : JSON.parse(readFile)
    //         if (!currentArr) throw new Error(`The document is empty!`)
    //         return currentArr
    //     } catch (err) {
    //         console.log(`Read file error: ${err.message}`)
    //     }
    // }

    getAll = async () => {
        return fs.promises
            .readFile(this.name, 'utf-8')
            .then(result => {
                let currentArr = !result ? '' : JSON.parse(result)
                if (!currentArr) throw new Error(`The document is empty!`)
                return currentArr
            })
            .catch(err => {
                console.log(`Read file error: ${err.message}`)
            })
    }

    // deleteById(id) {
    //     fs.promises
    //         .readFile(this.name, 'utf-8')
    //         .then(result => {
    //             if (!id) throw new Error(`Missing 'id' parameter!`)

    //             console.log(`Read from file ${this.name} successful!`)

    //             let currentArr = !result ? '' : JSON.parse(result)
    //             if (!currentArr) throw new Error(`The document is empty!`)

    //             const idFound = currentArr.find(e => e.id === id)
    //             if (!idFound)
    //                 throw new Error(`ID '${id}' not found in document.`)

    //             let newArr = currentArr.filter(e => e.id !== id)
    //             newArr.length === 0
    //                 ? (newArr = '')
    //                 : (newArr = JSON.stringify(newArr))

    //             fs.promises
    //                 .writeFile(this.name, newArr)
    //                 .then(() => {
    //                     console.log(
    //                         `The object with ID '${id}' has been removed.`
    //                     )
    //                 })
    //                 .catch(err => {
    //                     console.error(`Write file error: ${err}`)
    //                 })
    //         })
    //         .catch(err => {
    //             console.error(`Read file error: ${err}`)
    //         })
    // }

    // deleteAll() {
    //     fs.promises
    //         .writeFile(this.name, '')
    //         .then(() => {
    //             console.log(
    //                 `¡All objects have been removed from the document ${this.name}!`
    //             )
    //         })
    //         .catch(err => {
    //             console.error(`Write file error: ${err}`)
    //         })
    // }
}

module.exports = Container
