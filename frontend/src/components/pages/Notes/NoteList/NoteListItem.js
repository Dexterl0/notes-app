import React from 'react'
import './NoteListItem.css';
import { Link } from 'react-router-dom'

function NoteListItem({ note }) {
  return (
    <Link className="noteListItem" to={`/note/${note._id}`}>
      <h2 className="noteListItem-title">{note.text}</h2>
      <p className="noteListItem-date">{new Date(note.updatedAt).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </Link>
  )
}

export default NoteListItem