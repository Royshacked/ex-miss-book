
const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="book-filter">
        <input onChange={handleChange} type="text" name="txt" placeholder="Book title..." />
        <input onChange={handleChange} type="number" name="price" placeholder="Book price..." />
    </section>
}