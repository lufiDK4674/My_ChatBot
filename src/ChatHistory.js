import React from 'react';

const ChatHistory = ({ chatHistory, onSelectChat, onNewChat }) => {
  return (
    <div style={{ width: '25%', borderRight: '1px solid #ddd', padding: '10px' }}>
      <h3>Chat History</h3>
      <button onClick={onNewChat} style={{ marginBottom: '10px' }}>
        + New Chat
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {chatHistory.map((chat, index) => (
          <li key={index} style={{ marginBottom: '10px', cursor: 'pointer' }}>
            <button onClick={() => onSelectChat(index)}>
              Chat {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
