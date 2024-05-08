const { useState, useEffect } = React


export function LongTxt({ txt, length }) {
    const [modifiedTxt, setModifiedTxt] = useState(txt)
    const [isTxtLong, setIsTxtLong] = useState(false)

    useEffect(() => {
        if (!isTxtLong) setModifiedTxt(prevModifiedTxt => prevModifiedTxt.slice(0, length))
        else setModifiedTxt(prevModifiedTxt => prevModifiedTxt = txt)
    }, [isTxtLong])

    function toggleTxt() {
        setIsTxtLong(prevIsReadMore => prevIsReadMore = !prevIsReadMore)
    }

    const read = isTxtLong ? '...Read less' : '...Read more'

    return <p className="long-txt">{modifiedTxt}<span onClick={toggleTxt}> {read}</span></p>
}