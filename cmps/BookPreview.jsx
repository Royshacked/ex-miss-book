export function BookPreview({ book, onSelect }) {
    return <article className="book-preview">
        <h3>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h3>
        <img src={book.thumbnail} alt="" onClick={() => onSelect(book)} />
        <p>Price: <span>{book.listPrice} {book.currencyCode}</span></p>
    </article>

}