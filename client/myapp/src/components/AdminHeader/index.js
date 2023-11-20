import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import './index.css'


const AdminHeader = () => {
    const navigate = useNavigate()
    const onClickLogoutBtn = () => {
        Cookie.remove('jwt_token')
        navigate("/")
    }
        return (
            <nav className="nav-container">
                <div>
                    <h1 className="title">Title</h1>
                </div>
                <ul className="nav-links">
                    <Link to="/admin" className="nav-link">
                        <li className="nav-link-text">Home</li>
                    </Link>
                    <Link to="/admin/school_register" className="nav-link">
                        <li className="nav-link-text">School Registration</li>
                    </Link>
                    <Link to="/admin/reports" className="nav-link">
                        <li className="nav-link-text">Reports</li>
                    </Link>
                    <Link to="/admin/change_password" className="nav-link">
                        <li className="nav-link-text">Change Password</li>
                    </Link>
                    <li className="nav-link-text">
                        <button className="logout-btn" onClick={onClickLogoutBtn}>Logout</button>
                    </li>
                </ul>
            </nav>
        )
}

export default AdminHeader