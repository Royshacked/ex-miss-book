export function BookPreview({ book }) {
    return <pre>{JSON.stringify(book, null, 4)}</pre>
}