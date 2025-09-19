import React, {useEffect} from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("access_token") || null)
    const navigate = useNavigate();

    const loginUser = (jwt) => {
        localStorage.setItem("access_token", jwt);
        setToken(jwt);
    }

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        setToken(null)
        navigate("/")
    };


    return (
        <AuthContext.Provider value={{
            token,
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}