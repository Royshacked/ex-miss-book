const { useState, useEffect } = React


export function LongTxt({ txt, length }) {
    if (txt.length < length) return
    const [isTxtLong, setIsTxtLong] = useState(false)

    const modifiedTxt = isTxtLong ? txt : txt.substring(0, length)

    function toggleTxt() {
        setIsTxtLong(prevIsReadMore => prevIsReadMore = !prevIsReadMore)
    }

    const readTxt = isTxtLong ? '...Read less' : '...Read more'

    return <p className="long-txt">{modifiedTxt}<span onClick={toggleTxt}> {readTxt}</span></p>
}