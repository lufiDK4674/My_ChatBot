import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ sender, text }) => (
  <div
    style={{
      textAlign: sender === 'user' ? 'right' : 'left',
      margin: '10px 0',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        padding: '10px',
        borderRadius: '10px',
        background: sender === 'user' ? '#d1e7dd' : '#f8d7da',
        maxWidth: '80%',
      }}
    >
      {/* Render Markdown */}
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  </div>
);

export default ChatMessage;
