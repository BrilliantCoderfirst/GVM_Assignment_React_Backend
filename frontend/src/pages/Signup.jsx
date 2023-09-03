import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSignUp() {
    const url = `https://gvm-backend-assignment.onrender.com/api/auth/signup`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        contact: contact,
        password: password,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          navigate("/GVM_Assig_React_App/");
        } else {
          alert("You are not Sign In");
        }
      })
      .catch((err) => console.log(err));

    setName("");
    setEmail("");
    setContact("");
    setPassword("");
    setRole("");
  }

  return (
    <>
      <div className="signUpContainer">
        <div className="box">
          <h1> SignUp </h1>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong> Name </strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <strong> Email address </strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong> Contact </strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong> Password </strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Label>
              <strong> Role </strong>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Choose One</option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="Customer">Customer</option>
            </Form.Select>

            <div className="btn1">
              <Button variant="primary" onClick={handleSignUp}>
                Sign Up
              </Button>
              <p>
                Already SignUp !
                <Link to="/GVM_Assig_React_App/">
                  <span className="text-primary loginLink"> Log In </span>
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
