import React from "react";
import "./css/App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ContactsProvider } from "./contexts/ContactsContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    return(
        <div className="main-content">
            <BrowserRouter>
                <AuthContextProvider>
                    <ContactsProvider>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<HomePage />}></Route>
                            <Route path="/auth/login" element={
                                <PublicRoute>
                                    <LoginPage/>
                                </PublicRoute>
                            }></Route>
                            <Route path="/auth/register" element={
                                <PublicRoute>
                                    <RegisterPage/>
                                </PublicRoute>
                            }></Route>

                            <Route path="/contacts" element={
                                <ProtectedRoute>
                                    <ContactPage />
                                </ProtectedRoute>
                            }></Route>

                        </Routes>
                    </ContactsProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    )
}

export default App;