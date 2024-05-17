export function ReviewPreview({ review }) {
    return <article className="review-preview">
        <p>Name: <span>{review.fullName}</span></p>
        <p>Rating: <span>{review.rating}</span></p>
        <p>Date: <span>{review.readAt}</span></p>
    </article>

}