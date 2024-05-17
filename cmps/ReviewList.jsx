import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
    return <ul className="review-list">
        {reviews.length > 0 && <h3>Reviews</h3>}

        {reviews.map(review => <li key={review.id}>
            <ReviewPreview review={review} />
            <button onClick={() => onRemoveReview(review.id)}>Remove</button>
        </li>)}
    </ul>
}