const { useState, useEffect } = React
const { useParams, useNavigate, useOutletContext } = ReactRouter


import { bookService } from "../services/books.service.js"

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview)
    const navigate = useNavigate()
    const { bookId } = useParams()
    const context = useOutletContext()

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

    return <section className="add-review">
        <h3>Add a review</h3>
        <form onSubmit={(ev) => context(ev, bookId, review)}>
            <input onChange={handleChange} type="text" name="fullName" value={review.fullName} placeholder="fullname" required />
            <input onChange={handleChange} type="number" name="rating" value={review.rating} placeholder="rating" min="1" max="5" required />
            <input onChange={handleChange} type="date" name="readAt" value={review.readAt} required />
            <button>Save Review</button>
        </form>
        <button onClick={() => navigate(`/book/${bookId}`)}>X</button>
    </section>
}