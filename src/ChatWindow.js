import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ currentChat, setCurrentChat }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Append user's message to the chat
    const newMessage = { sender: 'user', text: message };
    const updatedChat = [...currentChat, newMessage];
    setCurrentChat(updatedChat);
    setMessage('');
    setIsLoading(true);

    try {
      // Prepare payload for the Flask API
      const messages = updatedChat.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      // Send message to Flask API
      const response = await axios.post('http://localhost:5000/chat', { messages });
      const botMessage = { sender: 'bot', text: response.data.response };

      // Append bot's reply to the chat
      setCurrentChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setCurrentChat((prevChat) => [
        ...prevChat,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #ddd' }}>
        {currentChat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '10px 0',
            }}
          >
            <ChatMessage 
                sender={msg.sender} 
                text={msg.text} 
                style={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '10px',
                    background: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                }}
            />
            {/* <span
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                background: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
              }}
            >
              {msg.text}
            </span> */}
          </div>
        ))}
        {isLoading && <div style={{ textAlign: 'left' }}>Bot is typing...</div>}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

