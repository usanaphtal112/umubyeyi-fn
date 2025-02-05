import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const { conversationId } = useParams();

  // Debugging: Log the conversation ID
  console.log('Chat Page - Conversation ID:', conversationId);

  // Add validation for UUID format
  const isValidUUID = (uuid) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  };

  if (!conversationId || !isValidUUID(conversationId)) {
    return (
      <Container className="text-center mt-5">
        <h2>Invalid Conversation ID</h2>
        <p>Please select a valid conversation from the Health Advisors list.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Chat</h2>
      <ChatWindow conversationId={conversationId} />
    </Container>
  );
};

export default Chat;