import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./interviews.css";

const NewInterview = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { state } = useLocation();
  const topic = useMemo(() => state, [state]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: `AI response to: "${input}"` },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="new-interview__root">
      <h1 className="new-interview__header">{topic} Interview</h1>
      <div className="new-interview__chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`new-interview__message new-interview__message--${message.sender}`}
          >
            <div
              className={`new-interview__message-box new-interview__message-box--${message.sender}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="new-interview__input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="3"
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default NewInterview;
