import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <div>
      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand href="/PWLab6/home">Nikiflix</Navbar.Brand>
          <Nav className="me-auto">
            {isAuth ? <Nav.Link href="/PWLab6/home">Home</Nav.Link> : null}
          </Nav>
          <Nav>
            {isAuth ? <Nav.Link href="/PWLab6/logout">Logout</Nav.Link> :
              <Nav.Link href="/PWLab6/login">Login</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}