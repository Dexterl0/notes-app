import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './Logout.css';

function Logout({ setNotes }) {
    const { getLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        await fetch(`${process.env.REACT_APP_URL}/api/user/logout`, { credentials: 'include' });
        await getLoggedIn();
        navigate('/');
    }

    return (
        <div className="logout-button" onClick={() => { logout(); setNotes([]); }}>Logout</div>
    )
}

export default Logout