import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


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

        <form onSubmit={onSave}>
            <input onChange={handleChange} type="text" value={book.title} name="title" placeholder="Insert book title..." />
            <input onChange={handleChange} type="number" value={book.listPrice.amount} placeholder="Insert book tprice..." />
            <input onChange={handleChange} type="number" value={book.pageCount} placeholder="Insert book page count..." />
            <button>Save</button>
        </form>
    </section>
}