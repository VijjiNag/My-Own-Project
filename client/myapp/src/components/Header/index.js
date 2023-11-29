import React from "react";
import { Link } from "react-router-dom";
import './index.css'


const Header = () => {

        return (
            <>
            <nav className="nav-container-header">
                <div>
                    <img className="logo" src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1700608338/logo_vsucfx.png" alt="logo" />
                </div>
                <div className="nav-links">
                    <div className="dropdown">
                        <Link to="/" className="nav-link">
                            <button className="dropbtn">Home</button>
                        </Link>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Login</button>
                        <div className="dropdown-content-header">
                            <Link to="/admin_login">Admin</Link>
                            <Link to="/school_login">School</Link>
                            <Link to="/college_login">College</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
        )
}

export default Header