
const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [selectFilterType, setSelectFilterType] = useState('')

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSelect({ target }) {
        setSelectFilterType(target.value)
    }

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [selectFilterType]: value }))

    }
    console.log(filterByToEdit)
    return <section className="book-filter">
        <select name="filter-by" id="filter-by" onChange={onSelect}>
            <option value="title">Title</option>
            <option value="authors">Authors</option>
            <option value="categories">categories</option>
        </select>

        <input onChange={handleChange} value={filterByToEdit.txt} type="text" name="title" placeholder="Book title..." />
        <input onChange={handleChange} value={filterByToEdit.price} type="number" name="price" placeholder="Book price..." />
    </section>
}