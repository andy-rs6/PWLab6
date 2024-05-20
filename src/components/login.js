import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

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
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            navigate("/PWLab6/home")
          } catch (error) {
            alert(error.message);
          }
        };

    return (
<div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="Auth-form-container" style={{ fontSize: "1.2rem" }}>
                <form className="Auth-form" onSubmit={submit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title" style={{ fontSize: "2rem" }}>Sign In</h3>
                        <div className="form-group mt-4">
                            <label style={{ fontSize: "1.2rem" }}>Username</label>
                            <input className="form-control mt-1"
                                placeholder="Enter Username"
                                name='username'
                                type='text' value={username}
                                required
                                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group mt-4">
                            <label style={{ fontSize: "1.2rem" }}>Password</label>
                            <input name='password'
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                required
                                style={{ fontSize: "1.2rem", padding: "0.5rem" }}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit"
                                className="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
