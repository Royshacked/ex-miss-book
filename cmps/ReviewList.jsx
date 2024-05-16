import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews }) {

    console.log(reviews)
    return <ul className="review-list">
        {reviews.map(review => <li key={review.id}>
            <ReviewPreview review={review} />
        </li>)}
    </ul>
}