import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles.css";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
// import api from '../api/api';

function LoginPage() {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://stackoverclone-be.onrender.com/api/login",
        { email, password }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setLoading(false);
      history.push("/Home");
      login(token);
      window.location.reload(true);

      console.log(token);
    } catch (error) {
      console.error("Login failed:", error);
      setAlertMessage("Login failed. Please check your credentials.");
      setShowAlert(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Stack Over Clone Login
              <>
                <Button
                  className="float-end"
                  variant="warning"
                  size="sm"
                  ref={target}
                  onClick={() => setShow(!show)}
                >
                  Use Demo
                </Button>
                <Overlay target={target.current} show={show} placement="right">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Email: Admin@DemoTest.com password: Admin@123
                    </Tooltip>
                  )}
                </Overlay>
              </>
            </div>

            <div className="card-body">
              {showAlert && (
                <div className="alert alert-danger" role="alert">
                  {alertMessage}
                </div>
              )}
              <form onSubmit={handleLogin}>
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
                  <button
                    type="submit"
                    size="lg"
                    className="btn btn-outline-primary"
                    variant="outline-primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleLogin : null}
                  >
                    {isLoading ? "Loading…" : "Log In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
