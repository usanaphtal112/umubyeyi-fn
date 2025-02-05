import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col md={4}>
            <h5 className={styles.footerTitle}>Umubyeyi</h5>
            <p className={styles.footerText}>
              Supporting mothers through pregnancy and beyond, ensuring healthy beginnings for Rwandan families.
            </p>
          </Col>
          <Col md={4}>
            <h5 className={styles.footerTitle}>Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li><Link to="/health-advisors">Health Advisors</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className={styles.footerTitle}>Contact Us</h5>
            <ul className={styles.contactInfo}>
              <li>Email: support@umubyeyi.rw</li>
              <li>Phone: +250 780 XXX XXX</li>
              <li>Kigali, Rwanda</li>
            </ul>
          </Col>
        </Row>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Umubyeyi. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;