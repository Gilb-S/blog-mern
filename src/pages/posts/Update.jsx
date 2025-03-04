import React, { useContext, useState } from "react";
import { updatePost } from "../../controllers/Post.controller";
import Alert from "../../components/Alert";
import { PostContext } from "../../context/PostContext";
import { useLocation, useNavigate } from "react-router-dom";
import Success from "../../components/Success";

const Update = () => {
  //error state and success
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // post state context
  const { posts, setPosts } = useContext(PostContext);

  //nav hook
  const navigate = useNavigate();
  // location
  const { state } = useLocation();

  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);
  // handle create
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = await updatePost(state._id, title, body);
      //update the post
      setPosts([...posts, data.post]);
      //navigate into dashboard
      //navigate('/dashboard')
      //set success
      setSuccess(data.success);

      // Automatically clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
        navigate("/dashboard")
    }, 500)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Update the post</h1>

      <form>
        <input
          type="text"
          placeholder="Post title"
          className="input"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="6"
          placeholder="Post Content"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <button className="btn" onClick={handleUpdate}>
          Update
        </button>
      </form>
      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
