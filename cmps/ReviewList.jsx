import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
    return <ul className="review-list">
        {reviews.map(review => <li key={review.id}>
            <ReviewPreview review={review} />
            <button onClick={() => onRemoveReview(review.id)}>Remove</button>
        </li>)}
    </ul>
}