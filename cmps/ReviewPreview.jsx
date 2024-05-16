export function ReviewPreview({ review }) {
    return <article className="review-preview">
        <span>Name:{review.fullName}</span>
        <span>Rating:{review.rating}</span>
        <span>Date:{review.readAt}</span>
    </article>

}