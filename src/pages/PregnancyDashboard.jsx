import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, MapPin, Phone } from 'lucide-react';
import styles from './PregnancyDashboard.module.css';

const PregnancyDashboard = () => {
  const [pregnancyData, setPregnancyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPregnancyData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/umubyeyi/dashboard/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPregnancyData(response.data[0]);
      } catch (err) {
        setError('Failed to fetch pregnancy data');
      } finally {
        setLoading(false);
      }
    };
    fetchPregnancyData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!pregnancyData) { 
    return <div>No pregnancy data available.</div>;
  }

  const categories = [
    { id: 1, name: 'Food', icon: '🍎' },
    { id: 2, name: 'Mum', icon: '📱' },
    { id: 3, name: 'Articles', icon: '≡' }
  ];

  // Calculate weeks and days pregnant
  const weeksPregnant = pregnancyData.weeks_pregnant;
  const daysPregnant = pregnancyData.days_pregnant;

  // Calculate days remaining
  const expectedDeliveryDate = new Date(pregnancyData.expected_date_delivery);
  const currentDate = new Date(pregnancyData.current_date);
  const timeRemaining = expectedDeliveryDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.locationInfo}>
          <div className={styles.locationWrapper}>
            <MapPin size={16} className={styles.locationIcon} />
            <span className={styles.locationLabel}>Your location</span>
          </div>
          <span className={styles.locationValue}>Nyarugenge, Kimisagara</span>
        </div>
        <button className={styles.notificationButton}>
          <Bell size={24} />
        </button>
      </div>

      <h1 className={styles.welcomeText}>Hello Mukamana</h1>

      <div className={styles.pregnancyCard}>
        <div className={styles.progressSection}>
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 36 36" className={styles.progressSvg}>
              <circle cx="18" cy="18" r="15.91549430918954" 
                      className={styles.progressCircleBackground} />
              <circle cx="18" cy="18" r="15.91549430918954" 
                      className={styles.progressCircleForeground}
                      strokeDasharray={`${23 * 100 / 30}, 100`} />
            </svg>
            <div className={styles.progressText}>
              <span className={styles.days}>{daysPregnant}</span>
              <span className={styles.daysLabel}>Days</span>
            </div>
          </div>
          <div className={styles.progressInfo}>
            <h2 className={styles.weekText}>
            You're in week {weeksPregnant} pregnant
            </h2>
            <p className={styles.daysText}>
              Before birth {daysRemaining} days
            </p>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button className={styles.actionButton}>
            <span className={styles.buttonIcon}>👩</span>
            Mum
          </button>
          <button className={styles.actionButton}>
            <span className={styles.buttonIcon}>👶</span>
            Baby
          </button>
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <div className={styles.categoriesHeader}>
          <h3 className={styles.categoriesTitle}>Categories</h3>
          <a href="#" className={styles.viewAllLink}>View All</a>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.map(category => (
            <div key={category.id} className={styles.categoryCard}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recommendedSection}>
        <div className={styles.categoriesHeader}>
          <h3 className={styles.categoriesTitle}>Recommended for you</h3>
        </div>
        <div className={styles.recommendedGrid}>
          <div className={styles.recommendedCard}>
            <img src="/api/placeholder/150/200" alt="Recommended content" className={styles.recommendedImage} />
            <button className={styles.bookmarkButton}>
              <span className={styles.bookmarkIcon}>🔖</span>
            </button>
          </div>
          <div className={styles.recommendedCard}>
            <img src="/api/placeholder/150/200" alt="Recommended content" className={styles.recommendedImage} />
            <button className={styles.bookmarkButton}>
              <span className={styles.bookmarkIcon}>🔖</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyDashboard;