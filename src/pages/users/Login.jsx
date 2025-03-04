import React, { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/User.controller";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {

  // use user context provider
  const {setUser} = useContext(UserContext);
  // use navigate hook allow to navi into dash
  const navigate = useNavigate()

  // error state hook
  const [error, setError] = useState(null);

  // form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     await loginUser(email, password)

      // login and update using setUser 
      setUser({email, posts: []});
      // navigate to dashboard
      navigate("/dashboard")
    
    } catch (error) {
      setError(error.message); 
    }
  }

  return (
    <section className="card">
      <h1 className="title">Login to your account</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Login;
