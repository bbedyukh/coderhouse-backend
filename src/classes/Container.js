const fs = require('fs')

class Container {
    constructor(name) {
        this.name = name
    }

    getById = async id => {
        try {
            if (!id) throw new Error(`Missing 'id' parameter!`)
            const readFile = await fs.promises.readFile(this.name, 'utf-8')
            if (!readFile) throw new Error(`The document is empty!`)

            const data = JSON.parse(readFile).find(e => e.id === id)
            if (!data) throw new Error(`null`)
            return { status: 'success', payload: data }
        } catch (err) {
            console.log(`Read file error: ${err.message}`)
            return { status: 'error', message: `Read file error.` }
        }
    }

    getAll = async () => {
        try {
            const readFile = await fs.promises.readFile(this.name, 'utf-8')
            if (!readFile) throw new Error(`The document is empty!`)
            return { status: 'success', payload: JSON.parse(readFile) }
        } catch (err) {
            console.log(`Read file error: ${err.message}`)
            return { status: 'error', message: `Read file error.` }
        }
    }
}

module.exports = Container
