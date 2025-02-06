import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './GeneralUsers.module.css';

const GeneralUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/users/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleChat = async (userId) => {
    try {
      const checkResponse = await axios.get(
        `http://localhost:8000/api/v1/chat/conversations/direct/${userId}/`,
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
            `http://localhost:8000/api/v1/chat/conversations/direct/${userId}/`,
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
      } else if (error.response?.status === 403) {
        setError('Selected user is not a Health Advisor');
      } else {
        setError('Failed to check conversation');
      }
    }
  };

  return (
    <Container className={styles.container}>
      <h2 className={styles.title}>Available Users</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className={styles.usersList}>
        {users.map(user => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.first_name[0]}{user.last_name[0]}
              </div>
            </div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user.first_name} {user.last_name}</h3>
              <p className={styles.userPhone}>{user.phone_number}</p>
            </div>
            <button 
              className={styles.chatButton}
              onClick={() => handleChat(user.id)}
            >
              Start Chat
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GeneralUsers;