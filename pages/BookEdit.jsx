import { bookService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, Outlet } = ReactRouterDOM


export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const [bookList, setBookList] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return

        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBook(prevBook => ({ ...prevBook, [prop]: value }))
    }

    function onSearchBooks(ev) {
        ev.preventDefault()

        bookService.getGoogleBook(ev.target[0].value)
            .then(bookList => {
                setBookList(bookList)
                navigate('/book/edit/booklist')
            })
    }

    function onAddBook(book) {
        bookService.saveGoogleBook(book)
            .then(() => showSuccessMsg('Book saved successfully'))
            .catch((err) => showErrorMsg(err))
            .finally(() => navigate('/book'))
    }

    function onSave(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(() => showSuccessMsg('Book saved successfully'))
            .catch((err) => showErrorMsg(err))
            .finally(() => navigate('/book'))
    }

    return <section className="book-edit">
        <h2>{params.bookId ? 'Edit book' : 'Add book'}</h2>

        {!params.bookId && <div className="add-google-book">
            <form onSubmit={onSearchBooks}>
                <h3>Add Google book</h3>
                <input type="search" placeholder="Search book" />
                <button>🔎</button>
            </form></div>}

        <Outlet context={[bookList, onAddBook]} />

        <div className="edit-form">
            <img src={book.thumbnail} alt="" />

            <form onSubmit={onSave}>
                <span>Title:</span><input onChange={handleChange} type="text" value={book.title} name="title" placeholder="Insert book title..." />
                <span>Authors:</span><input onChange={handleChange} type="text" value={book.authors} name="authors" placeholder="Insert book authors..." />
                <span>PublishDate:</span><input onChange={handleChange} type="number" value={book.publishedDate} name="publishedDate" placeholder="Insert book publishedDate..." />
                <span>Categories:</span><input onChange={handleChange} type="text" value={book.categories} name="categories" placeholder="Insert book categories..." />
                <span>Language:</span><input onChange={handleChange} type="text" value={book.language} name="language" placeholder="Insert book language..." />
                <span>Price:</span><input onChange={handleChange} type="number" value={book.listPrice} name="listPrice" placeholder="Insert book price..." />
                <button>Save</button>
            </form>

            <Link to="/book"><button className="back-btn">Back</button></Link>
        </div>

    </section>
}