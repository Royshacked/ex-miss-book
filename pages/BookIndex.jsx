const { useState, useEffect } = React

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/books.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return <section className="book-index full">
        <header>
            <h2>BookIndex</h2>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            <button>Add Book</button>
        </header>

        <BookList books={books} onRemove={removeBook} />
    </section>
}