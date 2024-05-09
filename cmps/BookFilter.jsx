
const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter, resetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [selectFilterType, setSelectFilterType] = useState('title')

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSelect({ target }) {
        setSelectFilterType(target.value)
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, title: '', authors: '', categories: '', }))
    }

    function handleChange({ target }) {
        const { type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [selectFilterType]: value }))

    }

    return <section className="book-filter">
        <select name="filter-by" id="filter-by" onChange={onSelect}>
            <option value="title">Title</option>
            <option value="authors">Authors</option>
            <option value="categories">categories</option>
        </select>

        <span>Price</span>

        <input onChange={handleChange} value={filterByToEdit[selectFilterType]} type="text" name="title" placeholder={`By ${selectFilterType}...`} />
        <input onChange={handleChange} value={filterByToEdit.price} type="number" name="price" placeholder="By price..." />
    </section>
}