function Nav(props) {

    const navLinks = props.navLinks
    return (
        <nav>
            <ul className="nav nav-tabs">
                {navLinks.map(link => <li key={link} className="nav-item">{link}</li>)}
            </ul>
        </nav>

    )
}

export default Nav;
