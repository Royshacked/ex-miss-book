import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const books = [
    {
        id: "OXeMG8wNskc",
        title: "metus hendrerit",
        subtitle: "mi est eros dapibus himenaeos",
        authors: ["Barbara Cartland"],
        publishedDate: 1999,
        description: "placerat nisi sodales suscipit tellus",
        pageCount: 713,
        categories: ["Computers", "Hack"],
        thumbnail: "http://ca.org/books-photos/20.jpg",
        language: "en",
        listPrice: {
            amount: 109,
            currencyCode: "EUR",
            isOnSale: false,
        }
    }
]

const BOOK_KEY = 'bookDb'

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

_createBooks()

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount > filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(book => book)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter(filterBy = { txt: '', price: 0 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}

// Private functions

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)

    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 3; i++) {
            books.push(_createBook())
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    return books
}

function _createBook() {
    const book = {
        id: utilService.makeId(5),
        title: utilService.makeLorem(1),
        listPrice: {
            amount: utilService.getRandomIntInclusive(1, 999),
            currencyCode: 'EUR',
            isOnSale: false,
        }
    }
    return book
}