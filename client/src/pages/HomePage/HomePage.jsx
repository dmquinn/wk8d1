import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import FilterModal from "../../components/FilterModal";

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
      <button
        className={showChat ? "chatButtonHide" : "chatButton"}
        onClick={() => setShowChat(!showChat)}
      >
        CHAT
      </button>
      <Chat showChat={showChat} chatPartner={chatPartner} />
      {/* <FilterModal /> */}
    </div>
  );
}

export default HomePage;
