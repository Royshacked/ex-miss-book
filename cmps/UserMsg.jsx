
const { useState, useEffect } = React

import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 3000)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    console.log(msg)
    if (!msg) return null

    return (<section className={`user-msg ${msg.type}`}>
        <p>{msg.txt}</p>
        <button onClick={() => setMsg(null)}>X</button>
    </section>)
}
