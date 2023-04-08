import React, { useState, useEffect, useContext } from 'react'
import Nav from '../../../Nav';
import './NoteDisplay.css';
import { useParams, useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext';

function NoteDisplay() {
    const [text, setText] = useState("");
    const [date, setDate] = useState(Date.now());
    const [tag, setTag] = useState("Untagged");


    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const { noteId } = useParams();

    const getNote = async () => {
        const noteResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/get-single-note/${noteId}`);
        const noteJson = await noteResponse.json();
        setText(noteJson.text);
        setDate(noteJson.updatedAt);
        setTag(noteJson.tag);
    }

    const addNote = async (redirect) => {
        const addNoteData = {
            userId: currentUser,
            text,
            tag
        }

        const addResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/add-note`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addNoteData)
            });

        const addJson = await addResponse.json();

        if (redirect === true) {
            navigate(`/note/${addJson.savedNote._id}`);
        }
    };

    const deleteNote = async () => {
        const deleteNoteData = {
            noteId
        }

        const deleteResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/delete-note`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deleteNoteData)
            });

        navigate("/");
    }

    const editNote = async () => {
        const editNoteData = {
            noteId,
            text
        };

        const editResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/edit-note`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editNoteData)
            });

        const editJson = await editResponse.json();

        setText(editJson.text);
        setDate(editJson.updatedAt);
        setTag(editJson.tag)
    };

    const onClickHander = () => {
        const textArea = document.getElementById('text-area')
        textArea.focus();
    }

    const onChangeHandler = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    useEffect(() => {
        if (noteId) {
            getNote();
        }
    }, []);

    return (
        <div>
            {noteId ? <Nav icon={"back"} addEdit={editNote} /> : <Nav icon={"back"} addEdit={addNote} />}
            <div className="note-display">
                <div className="note-display-top">
                    <p>{new Date(date).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="note-display-icons">
                        {noteId ? <i class="fa-solid fa-check" onClick={editNote}></i> : <i class="fa-solid fa-check" onClick={() => { addNote(true) }}></i>}
                        {noteId && <Link className="note-tag-link" to={`/tags/${noteId}`}><i className="fa-solid fa-tag"></i></Link>    }
                        <i class="fa-solid fa-trash" onClick={deleteNote}></i>
                    </div>
                </div>
                <div className="note-display-text" onClick={onClickHander}>
                    <textarea id="text-area" onChange={(e) => { setText(e.target.value); onChangeHandler(e) }} value={text}></textarea>
                </div>
            </div>
        </div>
    )
}

export default NoteDisplay