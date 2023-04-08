import React, { useState, useEffect, useContext } from 'react'
import './Menu.css'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Menu({ menuVisibility, setMenuVisibility, getNoteList, getFilteredNotes, tags, getTags }) {

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    const hideMenu = () => {
        setMenuVisibility("hide");
    }

    useEffect(() => {
        if (currentUser) {
            getTags();
        }
    }, [currentUser]);

    return (
        <div className={`menu ${menuVisibility}`}>
            <div className="menu-category">
                <h2 className="menu-category">NOTES</h2>
                <i className="fa-solid fa-xmark menu-close-icon" onClick={hideMenu}></i>
            </div>
            <div className="menu-item" onClick={() => {getNoteList(); hideMenu();}}>
                <i className="fa-solid fa-note-sticky"></i>
                <p>All notes</p>
            </div>
            <div className="menu-category">
                <h2 className="menu-category">TAGS</h2>
                <i className="fa-solid fa-pen-to-square tag-icon" onClick={() => { hideMenu(); navigate('/tags'); }}></i>
            </div>
            <ul className="menu-tags-list">
                {currentUser && tags ? tags.map(tag => <div className="menu-item" key={tag} onClick={() => {getFilteredNotes(tag); hideMenu();}}>
                    <i className="fa-solid fa-tag"></i>
                    <li>{tag}</li>
                </div>)
                    :
                    null}
            </ul>
            <div className="menu-item">
                <i className="fa-solid fa-gear"></i>
                <p>Settings</p>
            </div>
        </div>
    )
}

export default Menu