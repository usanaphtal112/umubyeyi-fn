import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Navbar.module.css';

const Logo = () => (
  <div className={styles.logoContainer}>
    <img src="/logo.svg" alt="Logo" className={styles.logoImage} />
  </div>
);

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} 
      expand="lg" 
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <Logo />
          <span className={styles.brandText}>Umubyeyi</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={styles.toggler}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.mainNav}>
            {[
              { path: "/", label: "Home" },
              { path: "/health-advisors", label: "Advisors" },
              { path: "/users", label: "Community" },
              { path: "/dashboard", label: "Dashboard" }
            ].map(({ path, label }) => (
              <Nav.Link 
                key={path}
                as={Link} 
                to={path} 
                className={`${styles.navLink} ${isActive(path) ? styles.activeLink : ''}`}
              >
                {label}
              </Nav.Link>
            ))}
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
                  to="/login" 
                  className={`${styles.navLink} ${styles.loginLink}`}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  className={`${styles.navLink} ${styles.registerLink}`}
                >
                  Register
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