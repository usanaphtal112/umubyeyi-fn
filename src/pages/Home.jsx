import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PhoneIcon, CalendarIcon, UsersIcon, QrCodeIcon } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CalendarIcon className={styles.featureIcon} />,
      title: "Pregnancy Tracking",
      description: "Track your pregnancy journey week by week with personalized guidance, health tips, and timely reminders for check-ups and vaccinations."
    },
    {
      icon: <PhoneIcon className={styles.featureIcon} />,
      title: "Health Advisory",
      description: "Connect directly with Abajyanama b'Ubuzima for professional medical guidance. Get 24/7 support from certified health advisors."
    },
    {
      icon: <UsersIcon className={styles.featureIcon} />,
      title: "Community Support",
      description: "Join a supportive community of mothers sharing experiences and advice. Connect with other mothers in your area and build lasting friendships."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Health Advisors" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className={styles.heroContent}>
              <div className={styles.badge}>
                #1 Maternal Health App in Rwanda
              </div>
              <h1 className={styles.mainTitle}>
                Your Trusted Pregnancy Journey Companion
              </h1>
              <p className={styles.subtitle}>
                Supporting mothers from conception through their child's first 1,000 days with personalized care and professional guidance.
              </p>
              <div className={styles.ctaGroup}>
                <Button 
                  className={styles.ctaButton}
                  onClick={() => navigate('/health-advisors')}
                >
                  Talk to a Health Advisor
                </Button>
                <Button 
                  className={styles.secondaryButton}
                  onClick={() => navigate('/register')}
                >
                  Create Free Account
                </Button>
              </div>
              
              <div className={styles.statsSection}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <div className={styles.statNumber}>{stat.number}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </Col>
            <Col md={6} className={styles.imageSection}>
              <div className={styles.gradientCircle}></div>
              <img 
                src="/pregnant.svg" 
                alt="Expecting mother" 
                className={styles.heroImage} 
              />
              <div className={styles.floatingQR}>
                <QrCodeIcon size={32} className={styles.qrIcon} />
                <div className={styles.qrContent}>
                  <h4>Get the App</h4>
                  <p>Scan to download</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>
          How We Support Your Journey
          <span className={styles.sectionSubtitle}>
            Comprehensive care for every stage of your pregnancy
          </span>
        </h2>
        <Row>
          {features.map((feature, index) => (
            <Col md={4} key={index} className={styles.featureCard}>
              <div className={styles.featureContent}>
                <div className={styles.iconWrapper}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Download Section */}
      <div className={styles.downloadSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <h2>Download Our Mobile App</h2>
              <p>Get instant access to health advisors, tracking tools, and community support.</p>
              <div className={styles.appStoreButtons}>
                <Button className={styles.storeButton}>
                  <img src="/google-play.svg" alt="Get it on Google Play" />
                </Button>
                <Button className={styles.storeButton}>
                  <img src="/app-store.svg" alt="Download on App Store" />
                </Button>
              </div>
            </Col>
            <Col md={5}>
              <div className={styles.qrCodeLarge}>
                <img src="/qr-code.svg" alt="App download QR code" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className={styles.ctaSection}>
        <Container className="text-center">
          <h2>Start Your Journey Today</h2>
          <p>Join thousands of mothers in Rwanda who trust Umubyeyi for their maternal health needs</p>
          <Button 
            className={styles.registerButton}
            onClick={() => navigate('/register')}
          >
            Register Now - It's Free
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;