import React from 'react'
import { Link } from "react-router-dom";
import './index.css'

const NavLinkItems = props => {
    const { navList, setActiveId, isActiveLink } = props
    const { id, displayText } = navList

    const onClickLink = () => {
        setActiveId(id)
    }

    const navLinkBtnClassName = isActiveLink ? "nav-link-btn-active" : "nav-link-btn"

    return (
        <Link to={id} className='nav-link'>
            <li className='nav-link-text'>
                <button type='button' className={navLinkBtnClassName} onClick={onClickLink}>
                    {displayText}
                </button>
            </li>
        </Link>
    )
}

export default NavLinkItems