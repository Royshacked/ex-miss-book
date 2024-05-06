import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove, onSelect }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button onClick={() => onRemove(book.id)}>Remove</button>
                    <button onClick={() => onSelect(book)}>Select</button>
                </li>
            )}
        </ul>
    </section>
}