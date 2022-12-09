import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import "./Chat.css";

const socket = socketIOClient("http://localhost:5005");

const Chat = ({ showChat, chatPartner }) => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, chatPartner });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(socket.id);
      setMessageReceived(data.message);
    });
    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });
  }, [socket]);

  return (
    <div className={showChat ? "chatApp active" : "chatApp"}>
      <ul>{messageReceived}</ul>
      <div className={showChat ? "inputContainer" : "inputContainerHidden"}>
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
};

export default Chat;
