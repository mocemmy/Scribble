import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link} from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

const validateEmail = (email) => {
  return email.match(
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const validationErrors = {};
    if (!first_name.length) validationErrors.first_name = "First name is required";
    if (first_name.length > 50) validationErrors.first_name = "First name must be shorter than 50 characters";

    if (last_name.length > 50) validationErrors.last_name = "Last name must be shorter than 50 characters";
    if (!last_name) validationErrors.last_name = "Last name is required";

    if (!username) validationErrors.username = "Username is required";

    if (!email) validationErrors.email = "Email is required";
    if (!validateEmail(email)) validationErrors.email = 'Email is not valid'

    if (!password) validationErrors.password = "Password is required";
    if (password.length < 6) validationErrors.password = 'Password must be 6 or more characters'
    if (password !== confirmPassword)
        validationErrors.confirmPassword = "Passwords must match";

    setErrors(validationErrors);
}, [first_name, last_name, username, password, confirmPassword, email, hasSubmitted]);

const onClick = (e) => {
  e.preventDefault();
  setHasSubmitted(true);
}

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
        const data = await dispatch(signUp(first_name, last_name, username, email, password));
        if (data) {
          setErrors({serverErrors: data})
        }
    } 
  };

  return (
    <div className="form-container">
      <Link className="logo-container" to="/"><img className="logo" src="/images/scribble-logo-transparent.png" alt="scribble"/><h1 className='scribble'>&nbsp;Scribble</h1></Link>
      <h1 className="form-label">Create Account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {errors.serverErrors && <p className="errors">{errors.serverErrors}</p>}
        <label htmlFor="first-name">First name</label>
        {hasSubmitted && errors.first_name && (
                    <p className="errors">{errors.first_name}</p>
                )}
          <input
            type='text'
            name="first-name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
            <label htmlFor="last-name">Last name</label>
          {hasSubmitted && errors.last_name && (
                    <p className="errors">{errors.last_name}</p>
                )}
          <input
            type='text'
            name="last-name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
            <label htmlFor="email">Email</label>
          {hasSubmitted && errors.email && (
                    <p className="errors">{errors.email}</p>
                )}
          <input
            type="text"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label htmlFor="username">Username</label>
          <input
            type="text"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label htmlFor="password">Password</label>
        {hasSubmitted && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}
          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label htmlFor="confirm-password">Re-enter password</label>
        {hasSubmitted && errors.confirmPassword && (
                    <p className="errors">{errors.confirmPassword}</p>
                )}
          <input
            type="password"
            name='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button className="submit-button" onClick={onClick} type="submit">Create account</button>
      </form>
      <p>Already have an account? <Link to='/login'>Sign in</Link></p>
    </div>
  );
}

export default SignupFormPage;
