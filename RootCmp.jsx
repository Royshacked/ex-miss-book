
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { AddReview } from "./cmps/AddReview.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
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
                    <Route path="/book/:bookId" element={<BookDetails />}>
                        <Route path="/book/:bookId/addreview" element={<AddReview />} />
                    </Route>
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                </Routes>

            </main>
            <UserMsg />
        </Router>
    )
}