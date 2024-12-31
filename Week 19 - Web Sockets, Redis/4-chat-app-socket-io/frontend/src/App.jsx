import React, { useEffect } from 'react'
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000")

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
    })

    socket.on("customEventName", s => alert(s))
    socket.on("joined", s => alert(s));

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      App

      
    </div>
  )
}

export default App