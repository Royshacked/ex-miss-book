
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM



import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AboutUs } from "/pages/AboutUs.jsx"
import { BookIndex } from "/pages/BookIndex.jsx"
import { HomePage } from "/pages/HomePage.jsx"

export function RootCmp() {
    return (
        <Router>
            <AppHeader />

            <main className="content-grid">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                </Routes>
            </main>
        </Router>
    )
}