import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ projectId, refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:5005";

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, projectId };

    axios.post(`${API_URL}/api/tasks/`, requestBody).then((response) => {
      setTitle("");
      setDescription("");
      refresh();
    });
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

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
