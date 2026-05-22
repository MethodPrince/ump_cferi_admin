import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket, sendMessage } from '../services/api';
import '../styles/chat.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState(''); // optional field
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const socket = connectSocket();
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => disconnectSocket();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (showForm && (!name || !email)) {
      alert('Please fill in your name and email');
      return;
    }

    const messageData = {
      senderName: name || 'Anonymous',
      senderEmail: email || 'anonymous@example.com',
      message: newMessage,
      status: 'unanswered',
      ...(studentNumber ? { studentNumber } : {})
    };

    try {
      await sendMessage(messageData);
      setMessages(prev => [...prev, { ...messageData, isUser: true }]);
      setNewMessage('');
      setShowForm(false);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chat-container">
      {!isOpen ? (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          💬 Chat
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.isUser ? 'chat-message-user' : 'chat-message-admin'}>
                <div className="chat-message-sender">
                  {msg.senderName}
                  {msg.studentNumber && (
                    <span className="chat-student-number"> • {msg.studentNumber}</span>
                  )}
                </div>
                <div className="chat-message-text">{msg.message}</div>
              </div>
            ))}
          </div>

          {showForm && (
            <div className="chat-user-form">
              <input
                type="text"
                className="chat-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="chat-input"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="chat-input"
                placeholder="Student number (optional)"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>
          )}

          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;