const { useParams } = ReactRouter
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/books.service.js"




export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        bookService.get(params.bookId)
            .then(setBook)
    }, [params.bookId])


    if (!book) return <h3>Loading...</h3>

    const { pageCount, publishedDate, isOnSale, currencyCode, listPrice } = book
    const now = new Date().getFullYear()

    return <section className="book-details">
        <article>
            <div className="book-details-header">
                <h2>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h2>
                {(pageCount > 500 && <p>Serious Reading</p>) || (pageCount > 200 && <p>Descent Reading</p>) || (<p>Light Reading</p>)}
                {(now - publishedDate > 10 && <p>Vintage</p>) || (now - publishedDate <= 1 && <p>New</p>)}
                {(isOnSale && <p>On Sale!</p>)}
            </div>

            <h3>{book.subtitle}</h3>

            <p>Author: {book.authors}</p>
            <p>publishedDate: {publishedDate}</p>

            <LongTxt txt={book.description} length={100} />

            <p>pageCount: {pageCount}</p>
            <p>categories: {book.categories}</p>
            <p>language: {book.language}</p>
            <p>Price:
                <span className={(listPrice > 150 && 'red') || (listPrice < 100 && 'green') || ('')}> {listPrice} {currencyCode}</span>
            </p>
            <Link to={`/book/${book.nextBookId}`}><button className="next-btn">Next book</button></Link>
            <Link to={`/book/${book.prevBookId}`}><button className="prev-btn">Prev book</button></Link>
        </article>

        <img src={book.thumbnail} alt="" />
        <Link to="/book"><button className="back-btn">Back</button></Link>

    </section>
}