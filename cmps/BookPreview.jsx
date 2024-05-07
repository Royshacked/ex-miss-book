export function BookPreview({ book }) {
    return <article className="book-preview">
        <h3>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h3>
        <img src={book.thumbnail} alt="" />
        <p>Price: <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span></p>
    </article>

}