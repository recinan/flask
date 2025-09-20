const API_URL = "http://127.0.0.1:5000/auth"

export async function register(email, password) {
    const options = {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({email,password})
    }
    const response = await fetch(`${API_URL}/register`,options)
    const data = await response.json()

    if(!response.ok){
        throw new error(data.message || "Registeration Error!!")
    }

    return data.message;
}

export async function login(email, password) {
    const options = {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({email,password})
    }
    const response = await fetch(`${API_URL}/login`,options)
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || "Login Failed")
    }
    return data;
}