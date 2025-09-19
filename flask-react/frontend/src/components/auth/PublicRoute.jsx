import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicRoute = ({ children }) => {
    const { token } = useAuth();

    if(token){
        return <Navigate to="/contacts"/>
    }

    return children;
}

export default PublicRoute;
