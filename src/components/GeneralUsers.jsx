import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      // Check for existing conversation
      const checkResponse = await axios.get(
        `http://localhost:8000/api/v1/chat/conversations/direct/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Debug: Log the check response
      console.log('Check conversation response:', checkResponse.data);

      if (checkResponse.status === 200) {
        console.log('Navigating to chat with conversation ID:', checkResponse.data.id);
        navigate(`/chat/${checkResponse.data.id}`);
        return;
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // Create new conversation if not exists
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
          // 4. Navigate to new conversation
          const conversationId = createResponse.data.id;
          console.log('Navigating to new conversation:', conversationId);
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
    <Container className="mt-5">
      <h2>Available Users</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item 
            key={user.id} 
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{user.first_name} {user.last_name}</h5>
              <p className="text-muted">{user.phone_number}</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleChat(user.id)}
            >
              Start Chat
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default GeneralUsers;