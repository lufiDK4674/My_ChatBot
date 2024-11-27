import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatHistory from './ChatHistory';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);

  const saveCurrentChat = () => {
    if (currentChat.length > 0) {
      setChatHistory([...chatHistory, currentChat]);
      setCurrentChat([]);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatHistory
        chatHistory={chatHistory}
        onNewChat={saveCurrentChat}
      />
      <ChatWindow currentChat={currentChat} setCurrentChat={setCurrentChat} />
    </div>
  );
};

export default App;


