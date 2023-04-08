import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import NoteListItem from './NoteListItem'
import './NotesList.css'
import Nav from '../../../Nav'
import AuthContext from '../../../../context/AuthContext'

function NotesList({ setMenuVisibility, getNoteList, notes, setNotes, getTags }) {

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            getNoteList();
        }
    }, [currentUser]);

    return (
        <div>
            <Nav setMenuVisibility={setMenuVisibility} icon={'menu'} setNotes={setNotes} getTags={getTags} />
            <div className="notesList">
                {currentUser && notes ? notes.map((note) => (
                    <NoteListItem key={note._id} note={note} />
                ))
                    :
                    null}
                <Link to="/note" className="new-note">
                    <i className="fa-solid fa-plus new-note-icon"></i>
                    <div className="new-note-text">New Note</div>
                </Link>
            </div>
        </div>
    )
}

export default NotesList