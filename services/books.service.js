import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDb'

export const bookService = {
    query,
    get,
    getEmptyBook,
    remove,
    save,
    getDefaultFilter,
    getEmptyReview,
    saveReview,
    removeReview,
    getGoogleBook,
    saveGoogleBook,
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
                books = books.filter(book => book.listPrice > filterBy.price)
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

function getEmptyBook() {
    const book = {
        id: '',
        title: '',
        subtitle: utilService.makeLorem(4),
        authors: '',
        publishedDate: 0,
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: '',
        thumbnail: `./imgs/default_book.png`,
        language: '',
        listPrice: 0,
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7
    }
    return book
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
    return {
        title: filterBy.title,
        authors: filterBy.authors,
        categories: filterBy.categories,
        price: filterBy.price
    }
}

function getEmptyReview() {
    const reviews = {
        fullName: '',
        rating: '',
        readAt: '',
    }
    return reviews
}

function saveReview(bookId, newReview) {
    return get(bookId)
        .then(book => {
            newReview.id = utilService.makeId()
            book.reviews.push(newReview)
            return save(book)
        })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(reviewIdx, 1)
            return save(book)
        })
}

function getGoogleBook(searchVal) {
    const bookList = utilService.loadFromStorage("apiDb") || {};
    if (bookList[searchVal]) {
        return Promise.resolve(bookList[searchVal]);
    }
    axios
        .get(
            `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchVal}`
        )
        .then((data) => {
            bookList[searchVal] = data.data.items;
            utilService.saveToStorage("apiDb", bookList);
            return data.data.items;
        });
}

function saveGoogleBook(book) {
    const newBook = _formatGoogleBook(book)
    return storageService.post(BOOK_KEY, newBook)
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
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7,
                reviews: []
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

function _formatGoogleBook(book) {
    const newBook = {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: '',
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        language: book.volumeInfo.language,
        listPrice: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "ILS",
        isOnSale: Math.random() > 0.7,
        reviews: []
    }
    return newBook
}