import "../css/homepage.css" 
import { Link } from "react-router";

function HomePage(){
    return(
        <div className="homepage">
            <h1>HomePage</h1>
            <nav>
                <ul>
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/auth/login">Login</Link></li>
                    <li><Link to="/auth/register">Register</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default HomePage;