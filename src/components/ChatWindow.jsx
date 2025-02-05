import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { getUserIdFromToken } from '../utils/jwtUtils';
import styles from './ChatWindow.module.css';

const ChatWindow = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const currentUserId = getUserIdFromToken();

  useEffect(() => {
    if (!conversationId) {
      setError('Conversation ID is missing');
      return;
    }

    const wsUrl = `ws://localhost:8000/ws/chat/${conversationId}/?token=${localStorage.getItem('token')}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      setError('');
    };

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onerror = () => {
      setError('WebSocket connection error');
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/chat/messages/${conversationId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError('Failed to load messages');
      }
    };

    fetchMessages();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    try {
      ws.current.send(JSON.stringify({ message: newMessage }));
      setNewMessage('');
    } catch (error) {
      setError('Failed to send message');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.chatContainer}>
      {error && <Alert variant="danger">{error}</Alert>}

      {!isConnected && (
        <div className="text-center mb-3">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Connecting to chat...</span>
        </div>
      )}

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.noMessages}>
            Start a conversation...
          </div>
        ) : (
          <div className={styles.messageList}>
            {messages.map((message, index) => {
              const isSentByMe = message.sender.id === currentUserId;
              return (
                <div 
                  key={index} 
                  className={`${styles.messageWrapper} ${isSentByMe ? styles.sent : styles.received}`}
                >
                  <div className={styles.messageTime}>
                    {isSentByMe ? 'You' : message.sender.phone_number} • {formatTime(message.timestamp)}
                  </div>
                  <div className={styles.messageBubble}>
                    <div className={styles.messageText}>
                      {message.content || message.message}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <Form onSubmit={handleSendMessage} className={styles.messageInputContainer}>
        <Form.Control
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
          className={styles.messageInput}
        />
        <Button
          variant="secondary"
          type="submit"
          disabled={!isConnected || !newMessage.trim()}
          className={styles.sendButton}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ChatWindow;