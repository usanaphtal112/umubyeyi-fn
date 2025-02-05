import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Pregnancy Tracking",
      description: "Track your pregnancy journey with personalized guidance and timely reminders"
    },
    {
      title: "Health Advisory",
      description: "Connect directly with Abajyanama b'Ubuzima for professional medical guidance"
    },
    {
      title: "Community Support",
      description: "Join a supportive community of mothers sharing experiences and advice"
    }
  ];

  return (
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className={styles.heroContent}>
              <h1 className={styles.mainTitle}>Welcome to Umubyeyi</h1>
              <p className={styles.subtitle}>
                Your trusted companion from conception through your child's first 1,000 days
              </p>
              <Button 
                className={styles.ctaButton}
                onClick={() => navigate('/health-advisors')}
              >
                Talk to a Health Advisor
              </Button>
            </Col>
            <Col md={6} className={styles.imageSection}>
              <div className={styles.gradientCircle}></div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>How We Support You</h2>
        <Row>
          {features.map((feature, index) => (
            <Col md={4} key={index} className={styles.featureCard}>
              <div className={styles.featureContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <Container className="text-center">
          <h2>Start Your Journey Today</h2>
          <p>Join thousands of mothers in Rwanda who trust Umubyeyi for their maternal health needs</p>
          <Button 
            className={styles.registerButton}
            onClick={() => navigate('/register')}
          >
            Register Now
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;