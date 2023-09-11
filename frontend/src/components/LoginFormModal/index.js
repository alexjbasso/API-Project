import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const logInDemoUser = (e) => {
    e.preventDefault();
    const demoCredentials = {
      credential: "SpongeBob",
      password: "password"

    }

    setErrors({});
    return dispatch(sessionActions.login(demoCredentials))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      {errors.credential && (
        <p className="errors">{errors.credential}</p>
      )}

      <form className="login-fields-wrapper" onSubmit={handleSubmit}>
        <label>
          <input
            className="login-field"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="login-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <div className="submit-button-container">
          <button
            id="login-button"
            type="submit"
            disabled={credential.length < 4 || password.length < 6}>
            Log In
          </button>
        </div>
      </form>

      <button className="demo-user-login" onClick={logInDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
