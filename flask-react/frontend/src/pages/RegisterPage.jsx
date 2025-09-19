import RegisterForm from "../components/auth/RegisterForm";
import "../css/RegisterPage.css"

function RegisterPage(){
    return(
        <div className="register-page">
            <div className="register-container">
                <h2>Register</h2>
                <RegisterForm />
            </div> 
        </div>
    )
}

export default RegisterPage;