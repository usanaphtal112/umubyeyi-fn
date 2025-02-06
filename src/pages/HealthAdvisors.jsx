import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './HealthAdvisors.module.css';

const HealthAdvisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/users/health-advisor/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setAdvisors(response.data);
      } catch (err) {
        setError('Failed to fetch health advisors');
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  const handleChat = async (advisorId) => {
    try {
      const checkResponse = await axios.get(
        `http://localhost:8000/api/v1/chat/conversations/health-advisor/${advisorId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (checkResponse.status === 200) {
        navigate(`/chat/${checkResponse.data.id}`);
        return;
      }
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const createResponse = await axios.post(
            `http://localhost:8000/api/v1/chat/conversations/health-advisor/${advisorId}/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          navigate(`/chat/${createResponse.data.id}`);
        } catch (createError) {
          setError('Failed to start conversation');
        }
      } else {
        setError('Failed to check conversation');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" style={{ color: '#FB696D' }} />
        <p className={styles.loadingText}>Loading health advisors...</p>
      </div>
    );
  }

  return (
    <Container className={styles.container}>
      <h2 className={styles.title}>Health Advisors</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className={styles.advisorsList}>
        {advisors.map(advisor => (
          <div key={advisor.id} className={styles.advisorCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {advisor.first_name[0]}{advisor.last_name[0]}
              </div>
            </div>
            <div className={styles.advisorInfo}>
              <h3 className={styles.advisorName}>{advisor.first_name} {advisor.last_name}</h3>
              <p className={styles.advisorPhone}>{advisor.phone_number}</p>
            </div>
            <button 
              className={styles.chatButton}
              onClick={() => handleChat(advisor.id)}
            >
              Start Chat
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HealthAdvisors;