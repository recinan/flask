import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if(!token){
        return <Navigate to="/auth/login"/>
    }

    return children;
}

export default ProtectedRoute;

