import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useEffect } from "react";
const AddPost = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    number: null,
  });

  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5005";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pgd5xegv");
    data.append("cloud_name", "djiekzsxs");
    fetch("https://api.cloudinary.com/v1_1/djiekzsxs/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        data && console.log(data.url);
        return data.url;
      })
      .then((img) => {
        const body = { title, image: img, user, description };
        axios.post(`${API_URL}/api/posts/`, body).then((response) => {
          setTitle("");
          setDescription("");
          setImage("");
          refresh();
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="number"
          onChange={(e) => setData({ ...data, number: e.target.value })}
        ></input>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddPost;
