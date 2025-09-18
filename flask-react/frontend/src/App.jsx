import React from "react";
import "./css/App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ContactsProvider } from "./contexts/ContactsContext";
import { AuthContextProvider } from "./contexts/AuthContext";

function App(){
    return(
        <div className="main-content">
            <AuthContextProvider>
                <ContactsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />}></Route>
                            <Route path="/contacts" element={<ContactPage />}></Route>
                            <Route path="/auth/login" element={<LoginPage />}></Route>
                            <Route path="/auth/register" element={<RegisterPage />}></Route>
                        </Routes>
                    </BrowserRouter>
                </ContactsProvider>
            </AuthContextProvider>
        </div>
    )
}

export default App;