import React, {useState} from "react";
import { register } from "../../services/authService";

function RegisterForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        
        try{
        const message = await register(email, password)
        setSuccess(message)
        }catch(err){
            setError(err.message);
        }finally{ setLoading(false)}
    }

    

    return(
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" disabled={loading}>{loading ? "Loading...": "Register"}</button>
            {error && <p style={{color:"red"}}>{error}</p>}
            {success && <p style={{color:"green"}}>{success}</p>}
        </form>
    )   
}

export default RegisterForm;

