import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getX_Access = localStorage.getItem("X-Access");

  const handleLogin = () => {
    const url = `https://gvm-backend-assignment.onrender.com/api/auth/login`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getX_Access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userId", data?.data?._id);
        if (data.status === 0) {
          alert(data.message);
          navigate("/admin");
        } else if (data.status === 1) {
          alert(data.message);
          navigate("/vendor");
        } else if (data.status === 2) {
          alert(data.message);
          navigate("/customer");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="loginBox box">
          <h1>Log In</h1>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <strong>Email address </strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Password </strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="btn1">
              <Button variant="primary" onClick={handleLogin}>
                Log In
              </Button>
              <p>
                Don't have account !
                <Link to="/signup">
                  <span className="text-primary loginLink"> SignUp </span>
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
