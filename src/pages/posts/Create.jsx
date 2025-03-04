import React, { useContext, useState } from "react";
import { createPost } from "../../controllers/Post.controller";
import Alert from "../../components/Alert";
import { PostContext } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import Success from "../../components/Success";

const Create = () => {
  // Error and success states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Post state context
  const { posts, setPosts } = useContext(PostContext);

  // Navigation hook
  const navigate = useNavigate();

  // Form fields
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Handle create post
  const handleCreate = async (e) => {
    e.preventDefault();

    // Check if fields are empty before sending request
    if (!title || !body) {
      setError("All fields are required");
      return;
    }

    try {
      const data = await createPost(title, body);

      // Update post state
      setPosts([...posts, data.post]);

      // Clear error and show success message
      setError(null);
      setSuccess(data.success);

      // Delay navigation to let user see success message
      setTimeout(() => {
        setSuccess(null);
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setSuccess(null); // Clear success in case of error
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create a new post</h1>

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

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

        <button className="btn" onClick={handleCreate}>
          Create
        </button>
      </form>
    </section>
  );
};

export default Create;
