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
        <>
            <nav className="nav-container">
                <div>
                    <img className="logo" src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1700608338/logo_vsucfx.png" alt="logo" />
                </div>
                <div className="nav-links">
                    <div class="dropdown">
                        <Link to="/admin" className="nav-link">
                            <button class="dropbtn">Home</button>
                        </Link>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Register</button>
                        <div class="dropdown-content">
                            <Link to={`/admin/${getAdminId}/register/school`}>School</Link>
                            <Link to={`/admin/${getAdminId}/register/college`}>College</Link>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Reports</button>
                        <div class="dropdown-content">
                            <Link to={`/admin/${getAdminId}/reports/school`}>School</Link>
                            <Link to={`/admin/${getAdminId}/reports/college`}>College</Link>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <Link to={`/admin/${getAdminId}/change_password`}>
                            <button class="dropbtn">Change Password</button>
                        </Link>
                    </div>
                    <div class="dropdown">
                            <button class="dropbtn" onClick={onClickLogoutBtn}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminHeader