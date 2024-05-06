import { AboutUs } from "/pages/AboutUs.jsx"
import { BookIndex } from "/pages/BookIndex.jsx"
import { HomePage } from "/pages/HomePage.jsx"

const { useState } = React

export function RootCmp() {
    const [route, setRoute] = useState('bookindex')
    return (
        <main className="content-grid">
            <header className="full">
                <h1>Miss Books</h1>
                <nav>
                    <a href="#" onClick={() => setRoute('homepage')}>Homepage</a>
                    <a href="#" onClick={() => setRoute('aboutus')}>AboutUs</a>
                    <a href="#" onClick={() => setRoute('bookindex')}>BookIndex</a>
                </nav>
            </header>

            {route === 'homepage' && <HomePage />}
            {route === 'aboutus' && <AboutUs />}
            {route === 'bookindex' && <BookIndex />}
        </main>
    )
}