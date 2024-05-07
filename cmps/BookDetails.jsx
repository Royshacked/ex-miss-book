export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <div>
            <h2>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h2>
            <h3>{book.subtitle}</h3>
            <p>Author: {book.authors}</p>
            <p>publishedDate: {book.publishedDate}</p>
            <p>description: {book.description}</p>
            <p>pageCount: {book.pageCount}</p>
            <p>categories: {book.categories}</p>
            <p>language: {book.language}</p>
            <p>Price: <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span></p>
        </div>

        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>X</button>
    </section>
}