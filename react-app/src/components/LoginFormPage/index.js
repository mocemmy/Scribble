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
    const response = await dispatch(login(email, password));
    if (response.errors) {
      const serverErrors = {}
      serverErrors.serverErrors = []
      if(response.errors.email){
        serverErrors.email = response.errors.email
      }
      if(response.errors.password){
        serverErrors.password = response.errors.password
      }
      for(let field in response.errors){
        if(field !== 'email' && field !== 'password') serverErrors.serverErrors.push(response.errors[field])
      }
      setErrors(serverErrors)
    }
  };

  return (
    <div className="form-container">
    <Link className="logo-container" to="/"><img className="logo" src="/images/scribble-logo-transparent.png" alt="scribble"/><h1 className='scribble'>&nbsp;Scribble</h1></Link>
      <h1 className="form-label">Sign In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.serverErrors && errors.serverErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label htmlFor="email">Email</label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <input
            type="text"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label htmlFor="password">Password</label>
        {errors.password && <p className="errors">{errors.password}</p>}
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
