import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import Nav from '../../Nav';
import AuthContext from '../../../context/AuthContext';

function Login({ setMenuVisibility }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password
      };

      const loginResponse = await fetch(`${process.env.REACT_APP_URL}/api/user/login`,
        {
          method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        }
      );

      const loginResJson = await loginResponse.json();

      if (loginResJson.error) {
        setError(loginResJson.error);
      } else {
        await getLoggedIn();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <div>
      <Nav setMenuVisibility={setMenuVisibility} />
      <div className="login">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          {error && <div>{error}</div>}
          <input className="login-input" placeholder="Email:" onChange={(e) => { setEmail(e.target.value) }} />
          <input className="login-input" type="password" placeholder="Password:" onChange={(e) => { setPassword(e.target.value) }} />
          <button className="login-button" onClick={login}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login