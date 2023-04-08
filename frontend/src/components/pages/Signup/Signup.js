import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import Nav from '../../Nav';
import AuthContext from '../../../context/AuthContext';

function Signup({ setMenuVisibility }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    try {
      const signupData = {
        email,
        password,
        confirmPassword
      };

      const signupResponse = await fetch(`${process.env.REACT_APP_URL}/api/user/signup`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData)
        }
      );

      const signupResJson = await signupResponse.json();

      if (signupResJson.error) {
        setError(signupResJson.error);
      } else {
        await getLoggedIn();
        navigate('/')
      };

    } catch (err) {
      console.error(err);
    };
  };

  return (
    <div>
      <Nav setMenuVisibility={setMenuVisibility} />
      <div className="signup">
        <div className="signup-container">
          <h2 className="signup-title">Sign Up</h2>
          {error && <div>{error}</div>}
          <input className="signup-input" placeholder="Email:" onChange={(e) => { setEmail(e.target.value) }} />
          <input className="signup-input" type="password" placeholder="Password:" onChange={(e) => { setPassword(e.target.value) }} />
          <input className="signup-input" type="password" placeholder="Confirm Password:" onChange={(e) => { setConfirmPassword(e.target.value) }} />
          <button className="signup-button" onClick={signup}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup