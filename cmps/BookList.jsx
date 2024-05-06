export function BookList({ books }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <pre>{JSON.stringify(book, null, 2)}</pre>
                </li>
            )}
        </ul>
    </section>
}