import { useEffect, useState } from "react";

function App() {
  const [lastMessage, setLastMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello from ws");
    };

    newSocket.onmessage = (message) => {
      console.log("Message received:", message);
      setLastMessage(message.data);
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <div>
      Last message: {lastMessage}
      <br />
      <br />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />{" "}
      <button onClick={() => socket?.send(message)}>Send</button>
    </div>
  );
}

export default App;
