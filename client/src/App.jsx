import React, { useEffect } from "react";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useState("");

  const getMessages = () => {
    fetch("http://localhost:3000/get-messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/add-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, user }),
    }).then(() => getMessages());
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setUser(e.target.value)}
      />
      <ul style={{ height: "50vh" }}>
        {messages.map((message) => (
          <li>
            {message.user !== user ? <span>{message.user} |||||| </span> : null}
            <span>{message.message}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
