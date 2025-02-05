import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Navbar.module.css';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    if (!token) {
      alert("No active session found.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <Navbar className={styles.navbar} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          Umubyeyi
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={styles.toggler}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={styles.navLink}
              activeClassName={styles.activeLink}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/health-advisors" 
              className={styles.navLink}
              activeClassName={styles.activeLink}
            >
              Health Advisors
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/users" 
              className={styles.navLink}
              activeClassName={styles.activeLink}
            >
              General Users
            </Nav.Link>
          </Nav>
          <Nav className={styles.authLinks}>
            {token ? (
              <Nav.Link 
                onClick={handleLogout} 
                className={`${styles.navLink} ${styles.authLink}`}
              >
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  className={`${styles.navLink} ${styles.registerLink}`}
                >
                  Register
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className={`${styles.navLink} ${styles.loginLink}`}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;