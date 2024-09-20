// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { receiveMessageFromBot, sendMessageToBot } from "./botService";

function App() {
  const [botResponse, setBotResponse] = useState("");

  useEffect(() => {
    receiveMessageFromBot((message) => {
      setBotResponse(message);
    });
  }, []);

  const handleButtonClick = () => {
    sendMessageToBot("school").catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Direct Line Demo</h1>
        <button onClick={handleButtonClick}>Send Message to Bot</button>
        {botResponse && <div className="bot-response">{botResponse}</div>}
      </header>
    </div>
  );
}

export default App;
