import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button onClick={() => onRemove(book.id)}>Remove</button>
                </li>
            )}
        </ul>
    </section>
}