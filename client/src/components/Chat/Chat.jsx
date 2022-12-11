import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Home from "./components/Home";
import Login from "./components/Login";

import socket from "./socket";

const Chat = () => {
  const [username, setUserName] = useState("");
  const [usersList, addUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { currentUser } = useContext(AuthContext);

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
    if (!usersList.includes(user)) {
      addUsers([...usersList, user]);
    } else console.log("HELLO, NO");
  });
  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      socket.auth = { username };
      socket.connect();
    }
  }, [currentUser, username]);
  return (
    <div className="App">
      <Home user={username} connectedUsers={usersList} />
    </div>
  );
};

export default Chat;
