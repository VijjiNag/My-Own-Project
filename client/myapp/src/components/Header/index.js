import React, { Component } from "react";
import { Link } from "react-router-dom";
import './index.css'


class Header extends Component {

    render() {
        return (
            <nav className="nav-container">
                <div>
                    <h1 className="title">Title</h1>
                </div>
                <ul className="nav-links">
                    <Link to="/" className="nav-link">
                        <li className="nav-link-text">Home</li>
                    </Link>
                    <Link to="/admin_login" className="nav-link">
                        <li className="nav-link-text">Admin Login</li>
                    </Link>
                    <Link to="/school_login" className="nav-link">
                        <li className="nav-link-text">School Login</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default Header