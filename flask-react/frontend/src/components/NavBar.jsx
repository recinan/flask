import React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import "../css/NavBar.css"

function NavBar(){
    const {token, logoutUser} = useAuth();

    return(
        <nav style={{ padding: "10px", background: "#eee" }}>
            {token ? (
                <>
                    <Link to="/contacts" style={{ marginRight: "15px" }}>Contacts</Link>
                    <button onClick={logoutUser}>Logout</button>
                </>
            ):(
                <>
                    <Link to="/auth/login" style={{ marginRight: "15px" }}>Login</Link>
                    <Link to="/auth/register" style={{ marginRight: "15px" }}>Register</Link>
                </>
            )}
        </nav>
    )
}

export default NavBar;
