const { useOutletContext } = ReactRouter
const { Link } = ReactRouterDOM


export function BookAddList() {
    const [bookList, onAddBook] = useOutletContext()

    return <section className="bookadd-list">
        <h3>Choose book from list</h3>
        <ul>
            {bookList.map(book =>
                <li key={book.id}>
                    {book.volumeInfo.title}
                    <button onClick={() => onAddBook(book)}>➕</button>
                </li>
            )}
        </ul>
        <Link to="/book/edit"><button>Back</button></Link>
    </section>
}