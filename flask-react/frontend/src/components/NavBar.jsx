import React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import "../css/NavBar.css"

function NavBar(){
    const {token, logoutUser} = useAuth();

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <Link className="navbar-brand" to="/">MyApp</Link>
            <div className="collapse navbar-collapse justify-content-end">
                {token ? (
                    <>
                        <Link className="nav-link" to="/contacts">Contacts</Link>
                        <button className="btn btn-primary ms-2" onClick={logoutUser}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/auth/login">Login</Link>
                        <Link className="nav-link" to="/auth/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar;
