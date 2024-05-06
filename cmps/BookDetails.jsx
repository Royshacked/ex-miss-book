export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <pre>{JSON.stringify(book, null, 4)}</pre>
        <button onClick={onClose}>X</button>
    </section>
}