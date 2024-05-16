import { bookService } from "../services/books.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState } = React

export function AddReview({ book }) {

    const [review, setReview] = useState(bookService.getEmptyReview)

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

        setReview(prevReview => ({ ...prevReview, [prop]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()

        bookService.addReview(book, review)
        saveReview(book)
    }

    function onDeleteReview() {
        bookService.removeReview(book)
    }

    function saveReview(book) {
        bookService.save(book)
            .then(() => {
                showSuccessMsg('Book review saved successfully')
            })
    }

    return <section className="add-review">
        <form onSubmit={onAddReview}>
            <input onChange={handleChange} type="text" name="fullName" value={review.fullName} placeholder="fullname" />
            <input onChange={handleChange} type="number" name="rating" value={review.rating} placeholder="rating" />
            <input onChange={handleChange} type="date" name="readAt" value={review.readAt} />
            <button>Add Review</button>
        </form>
        <button onClick={onDeleteReview}>Delete Review</button>
    </section>
}