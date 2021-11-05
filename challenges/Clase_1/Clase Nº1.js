class User {
    constructor(firstname, lastname) {
        this.firstname = firstname
        this.lastname = lastname
        this.books = []
        this.pets = []
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`
    }

    addPet(pet) {
        this.pets.push(pet)
    }

    countPets() {
        return this.pets.length
    }

    addBook(name, author) {
        this.books.push({ name: name, author: author })
    }

    getBooksNames() {
        return this.books.map(book => book.name)
    }
}

const user = new User('Bogdan', 'Bedyukh')

console.log(user.getFullName())

user.addPet('Tita')
console.log(user.countPets())

user.addBook('Capitalism and Freedom', 'Milton Friedman')
user.addBook('La Argentina devorada', 'José Luis Espert')
console.log(user.getBooksNames())
