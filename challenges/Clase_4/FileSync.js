const fs = require('fs')

const data = `{
    id: 1,
    name: 'Bogdan',
}`

const writer = fs.writeFileSync('fileSync.txt', data)
const reader = fs.readFileSync('fileSync.txt', 'utf8')
console.log(reader)
