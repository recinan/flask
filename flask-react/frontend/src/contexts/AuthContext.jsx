import React, {useEffect} from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("access_token") || null)

    const loginUser = (jwt) => {
        localStorage.setItem("access_token", jwt);
        setToken(jwt);
    }

    const logoutUser = () => {
        localStorage.removeItem("access_token");
        setToken(null)
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