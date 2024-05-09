const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header full">
        <h1>Miss Books</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">AboutUs</NavLink>
        </nav>
    </header>
}