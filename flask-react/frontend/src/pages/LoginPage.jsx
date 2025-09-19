import LoginForm from "../components/auth/LoginForm";
import "../css/LoginPage.css"

function LoginPage(){
    return(
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;