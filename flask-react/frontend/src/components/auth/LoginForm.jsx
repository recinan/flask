import React,{useState} from "react";
import { login } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import "../../css/LoginPage.css";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            const token = await login(email, password);
            loginUser(token);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" className="login-button" disabled={loading}>{loading ? "Loading...": "Login"}</button>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
        </form>
    )

}

export default LoginForm;