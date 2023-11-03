import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";



function Register() {
    const { login } = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post(
                "https://stackoverclone-be.onrender.com/api/register",
                { email, password, username }
            );
            console.log(email)
            const { token } = response.data;
            localStorage.setItem("authToken", token);
            history.push("/login");
            login(token);
            alert("User Created")
            console.log(token);
        } catch (error) {
            console.error("Login failed:", error);
            setAlertMessage("User already used / Please fill the neccesary input");
            setShowAlert(true);
        }
    };

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Stack Over Clone Register
                        </div>

                        <div className="card-body">
                            {showAlert && (
                                <div className="alert alert-danger" role="alert">
                                    {alertMessage}
                                </div>
                            )}
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-Mail
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid justify-content-center">
                                    <Row>
                                        <Col>
                                            <button
                                                type="submit"
                                                size="lg"
                                                className="btn btn-outline-primary"
                                                variant="outline-primary"
                                            >Register
                                            </button>
                                        </Col>
                                        <Col>
                                            <button
                                                type="submit"
                                                onClick={routeChange}
                                                size="lg"
                                                className=" btn btn-outline-primary"
                                                variant="outline-primary"
                                            >Login
                                            </button>
                                        </Col>
                                    </Row>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Register;
