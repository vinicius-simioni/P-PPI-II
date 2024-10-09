import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
