import React, { useEffect, useState } from "react";

const DirectLineChat = () => {
  const [conversationId, setConversationId] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://directline.botframework.com/v3/directline/tokens/generate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer oi-Sse1_QH0.W_gEtYm1ZfG78DO9ImiOZJAE3hjVvEkzwaTkRXML6wM`,
            },
          }
        );
        const data = await response.json();
        const token = data.token;
        console.log("Token", token);

        const conversationResponse = await fetch(
          "https://directline.botframework.com/v3/directline/conversations",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const conversationData = await conversationResponse.json();
        setConversationId(conversationData.conversationId);
        setBearerToken(conversationData.token);

        console.log("Conversation ID", conversationData.conversationId);
        const ws = new WebSocket(conversationData.streamUrl);
        setWebSocket(ws);
      } catch (error) {
        console.error("Error fetching token or starting conversation:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Received message:", message);
          const activities = message.activities;
          if (activities && activities[0] && activities[0].type === "message") {
            setMessages((prevMessages) => [...prevMessages, activities[0]]);
          }
        } catch (error) {
          console.log("Failed to parse message:", error, event.data);
          // console.error("Failed to parse message:", error, event.data);
        }
      };
    }
  }, [webSocket]);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    try {
      await fetch(
        `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "message",
            from: { id: "user1" },
            text: input,
          }),
        }
      );
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1>Direct Line Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default DirectLineChat;
