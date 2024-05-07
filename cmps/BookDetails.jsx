export function BookDetails({ book, onClose }) {
    const { pageCount, publishedDate, listPrice } = book
    const now = new Date().getFullYear()

    return <section className="book-details">
        <article>
            <div className="book-details-header">
                <h2>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h2>
                {(pageCount > 500 && <p>Serious Reading</p>) || (pageCount > 200 && <p>Descent Reading</p>) || (<p>Light Reading</p>)}
                {(now - publishedDate > 10 && <p>Vintage</p>) || (now - publishedDate <= 1 && <p>New</p>)}
                {(listPrice.isOnSale && <p>On Sale!</p>)}
            </div>

            <h3>{book.subtitle}</h3>

            <p>Author: {book.authors}</p>
            <p>publishedDate: {publishedDate}</p>
            <p>description: {book.description}</p>
            <p>pageCount: {pageCount}</p>
            <p>categories: {book.categories}</p>
            <p>language: {book.language}</p>
            <p className={(listPrice.amount > 150 && 'red') || (listPrice.amount < 20 && 'green') || ('')}>Price: <span>{listPrice.amount} {listPrice.currencyCode}</span></p>
        </article>

        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>X</button>
    </section>
}