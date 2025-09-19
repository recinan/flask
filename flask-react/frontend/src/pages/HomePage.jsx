import "../css/homepage.css" 
import { Link } from "react-router";

function HomePage(){
    return(
        <div className="homepage">
            <h1>HomePage</h1>
            <nav className="homepage-nav">
                <ul>
                    <li><Link to="/contacts" className="nav-link">Contacts</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default HomePage;