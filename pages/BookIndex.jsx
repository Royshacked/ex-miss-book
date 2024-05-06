const { useState, useEffect } = React

import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/books.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
    }, [])

    return <section className="book-index">
        <h2>BookIndex</h2>
        <button>Add Book</button>

        <BookList books={books} />
    </section>
}