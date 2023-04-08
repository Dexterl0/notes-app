import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotesList from './components/pages/Notes/NoteList/NotesList'
import Signup from './components/pages/Signup/Signup'
import Login from './components/pages/Login/Login'
import Menu from './components/Menu'
import NoteDisplay from './components/pages/Notes/NoteDisplay/NoteDisplay'
import MenuBackground from './components/MenuBackground'
import TagsList from './components/pages/Notes/TagsList'
import AuthContext from './context/AuthContext'


function Router() {

    const [menuVisibility, setMenuVisibility] = useState("hide");

    const [notes, setNotes] = useState([]);

    const [tags, setTags] = useState();

    const { currentUser } = useContext(AuthContext);

    const getNoteList = async () => {
        try {
            const noteListResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/get-all-notes/${currentUser}`);
            const noteListJson = await noteListResponse.json();
            setNotes(noteListJson);
        } catch (err) {
            console.error(err);
        };
    };

    const getFilteredNotes = async (tag) => {
        try {
            const filteredNotesResponse = await fetch(`${process.env.REACT_APP_URL}/api/note/get-filtered-notes/${currentUser}/${tag}`)
            const filteredNotesJson = await filteredNotesResponse.json();
            setNotes(filteredNotesJson);
        } catch (err) {
            console.error(err);
        };
    };

    const getTags = async () => {
        try {
            const tagsResponse = await fetch(`${process.env.REACT_APP_URL}/api/user/get-tags/${currentUser}`);
            const tagsJson = await tagsResponse.json();
            setTags(tagsJson.tags);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <BrowserRouter>
            {menuVisibility === "show" ? <MenuBackground setMenuVisibility={setMenuVisibility} /> : null}
            <Menu menuVisibility={menuVisibility} setMenuVisibility={setMenuVisibility} getNoteList={getNoteList} getFilteredNotes={getFilteredNotes} tags={tags} getTags={getTags}/>
            <Routes>
                <Route path="/" element={<NotesList setMenuVisibility={setMenuVisibility} getNoteList={getNoteList} notes={notes} setNotes={setNotes} getTags={getTags}/>} />
                <Route path="/signup" element={<Signup setMenuVisibility={setMenuVisibility} />} />
                <Route path="/login" element={<Login setMenuVisibility={setMenuVisibility} />} />
                <Route path="/note/:noteId" element={<NoteDisplay />} />
                <Route path="/note" element={<NoteDisplay />} />
                <Route path="/tags/:noteId" element={<TagsList />} />
                <Route path="/tags" element={<TagsList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router