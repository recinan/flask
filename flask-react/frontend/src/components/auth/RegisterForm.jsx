import React, {useState} from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../css/RegisterPage.css"

function RegisterForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if(password !== password2){
            setError("Passwords don't match!");
            setLoading(false);
            setPassword("");
            setPassword2("");
            return;
        }

        try{
            const message = await register(email, password)
            setSuccess(message)
            navigate("/auth/login")
        }catch(err){
            setError(err.message);
        }finally{ setLoading(false)}
        

    }

    return(
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Re-type Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
            </div>
            <button type="submit" className="register-button" disabled={loading}>{loading ? "Loading...": "Register"}</button>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
        </form>
    )   
}

export default RegisterForm;

