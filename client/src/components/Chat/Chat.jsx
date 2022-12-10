import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Chatwindow from "./components/Chatwindow";
import Home from "./components/Home";
import Login from "./components/Login";

import socket from "./socket";

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [usersList, addUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useContext(AuthContext);

  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    addUsers(users);
  });

  socket.on("user connected", (user) => {
    addUsers([...usersList, user]);
  });

  useEffect(() => {
    console.log("usersList", usersList);
    if (user) {
      setUserName(user.name);
      socket.auth = { userName };
      socket.connect();
    }
  }, [user, userName]);

  return (
    <div className="App">
      <Home selectedUser={user} connectedUsers={usersList} />
    </div>
  );
};

export default Chat;
