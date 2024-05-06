import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDb'

export const bookService = {
    query,
    get,
    remove,
    save,

}

_createBooks()


function query() {
    return storageService.query(BOOK_KEY)
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
        id: storageService.makeId(),
        title: utilService.makeLorem(1),
        listPrice: {
            amount: utilService.getRandomIntInclusive(1, 999),
            currencyCode: 'EUR',
            isOnSale: false,
        }
    }
    return book
}