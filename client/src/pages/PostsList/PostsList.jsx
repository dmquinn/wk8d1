import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddPostForm from "../../components/AddPostForm/AddPostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const API_URL = "http://localhost:5005";

  const getPosts = () => {
    axios.get(`${API_URL}/api/posts`).then((response) => {
      setPosts(response.data);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div>{post.title}</div>
          </Link>
        ))}
      <AddPostForm refresh={getPosts} />
    </div>
  );
};

export default PostList;
