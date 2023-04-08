import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import './Nav.css';
import Logout from './Logout';

function Nav({ icon, setMenuVisibility, addEdit, setNotes, getTags }) {

  const { loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const showMenu = () => {
    setMenuVisibility('show');
  }

  return (
    <div className="nav">
      <div className="nav-menu-logo">
        {icon === 'menu' && <i className="fa-solid fa-bars menu-icon" onClick={() => {showMenu(); getTags()}}></i>}
        {icon === 'back' && <div onClick={() => { addEdit(); navigate("/") }}><i class="fa-solid fa-arrow-left back-icon"></i></div>}
        {icon === 'tags-back' && <div onClick={() => {addEdit(); navigate(-1) }}><i class="fa-solid fa-arrow-left back-icon"></i></div>}
        <Link to="/"><h1 className="logo">Notes</h1></Link>
      </div>
      {loggedIn ? <Logout setNotes={setNotes}/> :
        <div className="nav-login-signup">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>}
    </div>
  )
}

export default Nav