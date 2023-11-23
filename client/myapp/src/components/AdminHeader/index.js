import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import Cookies from "js-cookie";


const AdminHeader = () => {
    const navigate = useNavigate()
    const [getAdminId, setAdminId] = useState("")
    const [getAdminName, setAdminName] = useState("")
    useEffect(() => {
        const getProfile = async () => {
            const jwtToken = Cookies.get("jwt_token")
            const url = "http://localhost:3009/admin/profile/"
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                setAdminId(() => data.admin_id)
                setAdminName(() => data.name)
            }
        }
        getProfile()
    }, [])

    const onClickLogoutBtn = () => {
        Cookies.remove('jwt_token')
        navigate("/")
    }
    return (
        <nav className="nav-container">
            <div>
                <img className="logo" src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1700608338/logo_vsucfx.png" alt="logo" />
            </div>
            <ul className="nav-links">
                <Link to="/admin" className="nav-link">
                    <li className="nav-link-text">Home</li>
                </Link>
                <Link to={`/admin/${getAdminId}/school_register`} className="nav-link">
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