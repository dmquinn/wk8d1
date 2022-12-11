import React, { useEffect, useState } from "react";
import Chatwindow from "./Chatwindow";
import Sidebar from "./Sidebar";
const Home = ({ connectedUsers, user }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userSelected, setUserSelected] = useState(false); //So that any chat window is not rendered when app is loaded

  connectedUsers && console.log("in home", connectedUsers);

  const getSelectedUser = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
    console.log("In home, selected user:", user);
  };

  return (
    <div className="chat-container p-5">
      <div>
        <div className="user-list"></div>
        <Sidebar connectedUsers={connectedUsers} selectUser={getSelectedUser} />
      </div>
      {userSelected && (
        <div>
          <Chatwindow
            selectedUser={selectedUser}
            connectedUsers={connectedUsers}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
