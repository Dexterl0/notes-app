import React, { useState, useEffect, useContext } from 'react'
import Nav from '../../Nav'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext';
import './TagsList.css'

function TagsList() {
    const [tags, setTags] = useState([]);
    const [noteTag, setNoteTag] = useState("");
    const [newTag, setNewTag] = useState("");

    const { currentUser } = useContext(AuthContext);

    const { noteId } = useParams();

    const getTagsList = async () => {
        const tagsResponse = await fetch(`${process.env.REACT_APP_URL}/api/user/get-tags/${currentUser}`);
        const tagsJson = await tagsResponse.json();
        setTags(tagsJson.tags);
    }

    const getNote = async () => {
        const noteResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/get-single-note/${noteId}`);
        const noteJson = await noteResponse.json();
        setNoteTag(noteJson.tag);
    }

    const updateNoteTag = async () => {
        try {
            const updateNoteData = {
                noteId,
                tag: noteTag
            };

            const updateNoteResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/edit-tag`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateNoteData)
                });

        } catch (err) {
            console.error(err);
        }
    }

    const onClickHandler = () => {
        setTags([newTag, ...tags]);
        setNewTag("");
    }

    const updateTags = async () => {
        try {
            const updateTagData = {
                userId: currentUser,
                tags: tags
            };

            const updateTagsResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/edit-user-tags`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateTagData)
                }
            );

            const updateTagsJson = await updateTagsResponse.json();
            setTags(updateTagsJson);
            if (noteId) {
                updateNoteTag();
            }
        } catch (err) {
            console.error(err);
        }
    }



    useEffect(() => {
        getTagsList();
        if (noteId) {
            getNote();
        }
    }, []);

    let tagList;
    if (noteId) {
        tagList = currentUser && tags ? tags.map((tag) => {
            if (tag === noteTag) {
                return <div className="tag-list-item">
                    <input key={tag} type="radio" id={tag} name="tags" value={tag} onChange={(e) => setNoteTag(e.target.value)} defaultChecked />
                    <label htmlFor={tag}>{tag}</label>
                </div>
            } else {
                return <div className="tag-list-item">
                    <input key={tag} type="radio" id={tag} name="tags" value={tag} onChange={(e) => setNoteTag(e.target.value)} />
                    <label htmlFor={tag}>{tag}</label>
                </div>
            }
        }) : null
    } else {
        tagList = currentUser && tags ? tags.map((tag) =>
            <div key={tag} className="tag-list-item">
                <i key={tag} className="fa-solid fa-x" onClick={(e) => setTags(tags.filter(t => { return t !== tag }))}></i>
                <div>{tag}</div>
            </div>)
            : null
    }

    return (
        <div>
            <Nav icon={"tags-back"} addEdit={updateTags} />
            <div className="tags-list">
                {noteId ? <h2>Note Tag</h2> : <h2>User Tags</h2>}
                {tagList}
                <div className="add-tag">
                    <input type='text' onChange={(e) => setNewTag(e.target.value)} value={newTag} />
                    <button className="tags-list-button" onClick={onClickHandler}>Add new tag</button>
                </div>
            </div>
        </div>
    )
}

export default TagsList