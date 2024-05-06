const { useState, useEffect } = React

import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/books.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function selectBook(book) {
        setSelectedBook(prevSelectedBook => prevSelectedBook = book)
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return <section className="book-index">
        <h2>BookIndex</h2>
        <button>Add Book</button>
        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />

        {!selectedBook && <BookList books={books} onRemove={removeBook} onSelect={selectBook} />}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </section>
}