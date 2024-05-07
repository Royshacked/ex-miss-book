export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <h3>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h3>
        <p>Price: <span>{book.listPrice.amount}</span></p>
        <button onClick={onClose}>X</button>
    </section>
}