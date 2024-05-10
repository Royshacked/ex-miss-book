import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

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
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')
                books = books.filter(book => regExp.test(book.authors))
            }
            if (filterBy.categories) {
                const regExp = new RegExp(filterBy.categories, 'i')
                books = books.filter(book => regExp.test(book.categories))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount > filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(book => {
        book = _setNextPrevBookId(book)
        return book
    })
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

function getDefaultFilter(filterBy = { title: '', authors: '', categories: '', price: 0 }) {
    return { title: filterBy.title, authors: filterBy.authors, categories: filterBy.categories, price: filterBy.price }
}



// Private functions

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)

    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []

        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(1),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20), pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }


    return books
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

// function _createBook() {
//     const book = {
//         id: utilService.makeId(5),
//         title: utilService.makeLorem(1),
//         listPrice: {
//             amount: utilService.getRandomIntInclusive(1, 999),
//             currencyCode: 'EUR',
//             isOnSale: false,
//         }
//     }
//     return book
// }