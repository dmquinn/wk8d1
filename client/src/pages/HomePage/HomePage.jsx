import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";

import "./HomePage.css";

function HomePage() {
  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatPartner, setChatPartner] = useState("");

  const API_URL = "http://localhost:5005";

  const getUsers = () =>
    axios.get(`${API_URL}/api/users/`).then((response) => {
      setUsers(response.data);
    });

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="homePage">
      <Link to="/posts">projects</Link>
      {users.map((user) => {
        return (
          <button key={user._id} onClick={() => setChatPartner(user._id)}>
            {user.name}
          </button>
        );
      })}
      <button
        className={showChat ? "chatButtonHide" : "chatButton"}
        onClick={() => setShowChat(!showChat)}
      >
        CHAT
      </button>
      <div className={showChat ? "chatWindow chatShowing" : "chatWindow"}>
        <Chat showChat={showChat} chatPartner={chatPartner} />
      </div>
    </div>
  );
}

export default HomePage;
