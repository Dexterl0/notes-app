import React, { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    const getLoggedIn = async () => {
        const loggedInRes = await fetch(`${process.env.REACT_APP_URL}/api/user/loggedin`, { credentials: "include" });
        const resJson = await loggedInRes.json();
        setLoggedIn(resJson.loggedIn);
        setCurrentUser(resJson.userId.user);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return <AuthContext.Provider value={{ loggedIn, getLoggedIn, currentUser }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider };