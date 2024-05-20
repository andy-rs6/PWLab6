// Import the react JS packages 
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Define the Login function.
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Create thconst navigate = useNavigate();e submit method.
    const submit = async e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        console.log(user);

        try {
            const response = await fetch("http://localhost:8000/token/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
              throw new Error("Login failed. Please check your credentials.");
            }
            const data = await response.json();
            const accessToken = data["access"];
            const refreshToken = data["refresh"];
            console.log(data);
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            navigate("/home")
          } catch (error) {
            alert(error.message);
          }
        };
    // Initialize the access & refresh token in localstorage.      
    // localStorage.clear();
    // localStorage.setItem('access_token', data.access);
    // localStorage.setItem('refresh_token', data.refresh);
    // axios.defaults.headers.common['Authorization'] =
    //     `Bearer ${data['access']}`;
    // window.location.href = '/'

return (
    <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input className="form-control mt-1"
                        placeholder="Enter Username"
                        name='username'
                        type='text' value={username}
                        required
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input name='password'
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit"
                        className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
)
}