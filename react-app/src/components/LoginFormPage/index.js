import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { Link } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="form-container">
    <Link className="logo-container" to="/"><img className="logo" src="/images/scribble-logo-transparent.png" alt="scribble"/><h1 className='scribble'>&nbsp;Scribble</h1></Link>
      <h1 className="form-label">Sign In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label htmlFor="email">Email</label>
        <input
            type="text"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button className="submit-button" type="submit">Log In</button>
      </form>
      <div className="redirect-container">
      <p>New to Scribble?&nbsp;</p>
      <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}

export default LoginFormPage;
