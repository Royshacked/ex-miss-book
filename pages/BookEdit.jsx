import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
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

    function onSave(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(() => navigate('/book'))
            .catch((err) => {
                alert(err)
                navigate('/book')
            })
    }

    console.log(book)

    return <section className="book-edit">
        <h2>{params.bookId ? 'Edit book' : 'Add book'}</h2>
        <div className="edit-form">
            <img src={book.thumbnail} alt="" />
            <form onSubmit={onSave}>
                <span>Title:</span><input onChange={handleChange} type="text" value={book.title} name="title" placeholder="Insert book title..." />
                <span>Authors:</span><input onChange={handleChange} type="text" value={book.authors} name="authors" placeholder="Insert book authors..." />
                <span>Description:</span><input onChange={handleChange} type="text" value={book.description} name="description" placeholder="Insert book description..." />
                <span>Categories:</span><input onChange={handleChange} type="text" value={book.categories} name="categories" placeholder="Insert book categories..." />
                <span>Language:</span><input onChange={handleChange} type="text" value={book.language} name="language" placeholder="Insert book language..." />
                <span>Price:</span><input onChange={handleChange} type="number" value={book.listPrice.amount} placeholder="Insert book tprice..." />
                <span>Pages:</span><input onChange={handleChange} type="number" value={book.pageCount} placeholder="Insert book page count..." />
                <button>Save</button>
                {/* <img src={book.thumbnail} alt="" /> */}
            </form>
        </div>
        <Link to="/book"><button>X</button></Link>
    </section>
}