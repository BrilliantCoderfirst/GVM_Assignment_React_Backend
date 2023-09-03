import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <>
      <Navbar
        expand="xxl"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <Link to="/customer">MineCart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#">
                  <Link to="/customer">Home</Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/BuyProduct">Add Product</Link>
                </Nav.Link>
              </Nav>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
