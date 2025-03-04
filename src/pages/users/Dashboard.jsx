import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getUserPost } from "../../controllers/Post.controller";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {
  // Success and error state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Use user context
  const { user, setUser } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      try {
        // Grab the user post
        const { userPosts, email } = await getUserPost();

        // Update the state post
        setUser({ email, posts: userPosts });

        // End of loading
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    }, 500);
  }, []);

  // Handle delete post
  const handleDelete = async (_id) => {

    // confirm delete >
    if(confirm("confirm delete")){
      try {
        const data = await deletePost(_id);
  
        // Success message
        setSuccess(data.success);
  
        // Automatically clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 2000);
  
        // Update the posts after deletion
        const newPosts = user.posts.filter((post) => post._id !== _id);
        setUser({ ...user, posts: newPosts });
      } catch (error) {
        // Error message
        setError(error.message);
  
        // Automatically clear error message after 3 seconds
        setTimeout(() => setError(null), 500);
      }
    }


   
  };

  return (
    <section className="card">
      <p>{user.email}</p>
      <h1 className="title">User Dashboard</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-5xl text-indigo-400 text-center block" />
      )}

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      {user.posts &&
        user.posts.map((post) => (
          <div key={post._id}>
            <Post post={post}>
              <div className="flex items-center gap-10">
                <Link
                  className="fa-brands fa-medrt text-green-500 hover:bg-green-200 text-2xl"
                  title="Update"
                  state={post} // props new meta props :D 
                  to="/update"
                ></Link>
                <button
                  className="fa-regular fa-circle-xmark text-red-500 hover:bg-red-200 text-2xl"
                  title="Delete"
                  onClick={() => handleDelete(post._id)}
                ></button>
              </div>
            </Post>
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
