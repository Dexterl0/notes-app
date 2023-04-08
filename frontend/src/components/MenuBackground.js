import React from 'react'
import './MenuBackground.css'

function MenuBackground({ setMenuVisibility }) {

    return (
        <div className="menu-background" onClick={() => setMenuVisibility("hide")}></div>
    )
}

export default MenuBackground