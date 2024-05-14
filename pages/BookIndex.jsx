const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed successfully')
            })
            .catch(() => showErrorMsg('There was a problem'))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return <section className="book-index full">
        <header>
            <h2>BookIndex</h2>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />
            <Link to="/book/edit"><button>Add Book</button></Link>
        </header>

        <BookList books={books} onRemove={removeBook} />
    </section>
}