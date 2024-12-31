"use client";

import { useEffect, useState } from "react";
import { Send, X, MessageSquare, Users, ArrowLeftRight } from "lucide-react";

interface Message {
  type: string;
  userId: string;
  message: string;
  timestamp: string;
}

export default function Component() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [credentialsSet, setCredentialsSet] = useState<{ current: boolean }>({
    current: false,
  });

  useEffect(() => {
    if(ws) { return; }
    const websocket = new WebSocket("ws://localhost:8080");
    setWs(websocket);

    websocket.onopen = () => {
      console.log("Connection started");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setChat((prev) => [...prev, data]);
      }

      if (data.type === "history") {
        setChat(data.messages);
      }
    };

    websocket.onclose = () => {
      if (ws) {
        setWs(null);
      }
      console.log("Connection closed");
    };

    return () => {
      if (ws) {
        websocket.close();
        setCredentialsSet({ current: false });
        setWs(null);
      }
    };
  }, [ws, credentialsSet]);

  function joinRoom() {
    try {
      const messageToSend = {
        type: "join",
        room: roomName,
        userId: userId,
      };

      ws?.send(JSON.stringify(messageToSend));
      setCredentialsSet({ current: true });
    } catch (error) {
      console.log(error);
      alert("Error while joining");
    }
  }

  function sendMessage() {
    try {
      const messageToSend = {
        type: "message",
        room: roomName,
        userId: userId,
        message,
      };

      ws?.send(JSON.stringify(messageToSend));
      setMessage("");
    } catch (error) {
      console.log(error);
      alert("Error while sending message");
    }
  }

  function getHistory() {
    try {
      const historyRequest = {
        type: "getHistory",
        room: roomName,
      };
      ws?.send(JSON.stringify(historyRequest));
    } catch (error) {
      console.log(error);
      alert("Error while getting the history");
    }
  }

  function closeRoom() {
    ws?.close();
    setWs(null);
    setCredentialsSet({ current: false });
    setChat([]);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Real-time Chat with Rooms
        </h1>
      </header>
      <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {credentialsSet.current ? (
            <div className="flex flex-col h-[calc(100vh-12rem)]">
              <div className="flex items-center justify-between bg-gray-50 p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold text-gray-700">{userId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold text-gray-700">
                    {roomName}
                  </span>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {chat.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.userId === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                        msg.userId === userId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.userId !== userId && (
                        <p className="font-semibold">{msg.userId}</p>
                      )}
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Enter your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Enter Room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="p-4 bg-gray-50 border-t flex space-x-2">
            {credentialsSet.current ? (
              <>
                <button
                  onClick={closeRoom}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Close Chat</span>
                </button>
                <button
                  onClick={getHistory}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeftRight className="w-5 h-5" />
                  <span>Get History</span>
                </button>
              </>
            ) : (
              <button
                onClick={joinRoom}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Join Room</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
