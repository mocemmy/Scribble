import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BrowseDropdown.css'


function BrowseDropdown() {
    const [showMenu, setShowMenu] = useState(false)
    const dropdownRef = useRef();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowMenu(false)
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)

    }, [showMenu])

    const toggleMenu = () => {
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <div className='browse-container'>
            <div className='browse-links'>
                <Link className='browse-links' to='/app/browse-books'>Browse</Link>
                <Link onClick={toggleMenu} className="browse-links" >&nbsp;&#9660;</Link>
                <div className={showMenu ? "dropdown" : "hidden"} ref={dropdownRef}>
                    <Link onClick={toggleMenu} to='/app/browse-books'>Browse Books</Link>
                    <Link onClick={toggleMenu} to='/app/browse-lists'>Browse Lists</Link>
                </div>
            </div>
        </div>
    )
}

export default BrowseDropdown;