const { useOutletContext } = ReactRouter


export function BookAddList() {
    const [bookList, onAddBook] = useOutletContext()

    return <section className="bookadd-list">
        <ul>
            {bookList.map(book =>
                <li key={book.id}>
                    {book.volumeInfo.title}
                    <button onClick={() => onAddBook(book)}>➕</button>
                </li>
            )}
        </ul>
    </section>
}