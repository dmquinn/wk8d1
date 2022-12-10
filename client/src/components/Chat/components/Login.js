import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";

const Login = ({ submit }) => {
  const { user } = useContext(AuthContext);
  user && console.log(user);

  const handleClick = () => {
    console.log("clicked");
    const username = user.name;
    submit(username);
  };
  return (
    <div className="login-container">
      <h1>Chat Prototype</h1>
      <button onClick={handleClick}>Start Chatting</button>
    </div>
  );
};

export default Login;
