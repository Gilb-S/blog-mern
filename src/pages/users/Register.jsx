import React, { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/User.controller";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Register = () => {

  // use usercontext
  const {setUser} = useContext(UserContext)
  // navigate hook
  const navigate = useNavigate()

  // error state hook
  const [error, setError] = useState(null);

  // form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });
  

  // handle login
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // register here
      await registerUser(formData.email, formData.password, formData.passwordConfirm)

     // login and update using setUser 
      setUser({email: formData.email, posts: []});
      // navigate to dashboard
      navigate("/dashboard")
    } catch(error) {
      setError(error.message)
    }
    
  }

  return (
    <section className="card">
      <h1 className="title">Create a new account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          type="password"
          placeholder="confirm password"
          className="input"
          value={formData.passwordConfirm}
          onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
        />
        <button className="btn">Register</button>
      </form>
      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
