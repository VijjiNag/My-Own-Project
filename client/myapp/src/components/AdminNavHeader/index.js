import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Cookies from "js-cookie";
import './index.css'

const AdminNavHeader = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [getAdminId, setAdminId] = useState("")
    const [getAdminName, setAdminName] = useState("")
    const homeActiveClass = location.pathname === "/admin/dashboard"
    const ChangePasswordActiveClass = location.pathname === `/admin/${getAdminId}/change_password`
    const schoolRegisterActiveClass = (location.pathname === `/admin/${getAdminId}/register/school`)
    const collegeRegisterActiveClass = (location.pathname === `/admin/${getAdminId}/register/college`)
    const schoolReportsActiveClass = (location.pathname === `/admin/${getAdminId}/reports/school`)
    const collegeReportsActiveClass = (location.pathname === `/admin/${getAdminId}/reports/college`)
    const userQueryReportsActiveClass = (location.pathname === `/admin/${getAdminId}/reports/user_query`)
    useEffect(() => {
        const getProfile = async () => {
            const jwtToken = Cookies.get("jwt_token")
            const url = "http://localhost:3009/admin/profile"
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                setAdminId(() => data.userProfile.id)
                setAdminName(() => data.userProfile.name)
            }
        }
        getProfile()
    }, [], [])

    const onClickLogoutBtn = () => {
        Cookies.remove('jwt_token')
        navigate("/")
    }

    return (
        <>
            <nav className="admin-nav-header-bg-container">
                <div className="admin-header-logo-container">
                    <Link to="/admin/dashboard" className="admin-header-menu-link">
                        <img className="logo" src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1700608338/logo_vsucfx.png" alt="logo" />
                        <img className="logo site-name" src="https://res-console.cloudinary.com/dhfmjj1j9/thumbnails/v1/image/upload/v1702902197/c2Nob29sX3Bhc3MxX290YmJzZw==/grid_landscape" />
                    </Link>
                </div>
                <div className={homeActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <MdDashboard className={homeActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to="/admin/dashboard" className={homeActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>Dashboard</Link>
                </div>
                <div className={ChangePasswordActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <TbPasswordUser className={ChangePasswordActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/change_password`} className={ChangePasswordActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>Change Password</Link>
                </div>
                <p className="admin-desc-head">Registration</p>
                <div className={schoolRegisterActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <IoIosSchool className={schoolRegisterActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/register/school`} className={schoolRegisterActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>School</Link>
                </div>
                <div className={collegeRegisterActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <BiSolidSchool className={collegeRegisterActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/register/college`} className={collegeRegisterActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>College</Link>
                </div>
                <p className="admin-desc-head">Reports</p>
                <div className={schoolReportsActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <IoIosSchool className={schoolReportsActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/reports/school`} className={schoolReportsActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>School</Link>
                </div>
                <div className={collegeReportsActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <BiSolidSchool className={collegeReportsActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/reports/college`} className={collegeReportsActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>College</Link>
                </div>
                <div className={userQueryReportsActiveClass ? "admin-header-active-menu" : "admin-header-menu"}>
                    <FaUser className={userQueryReportsActiveClass ? "admin-header-menu-icon-active" : "admin-header-menu-icon"} />
                    <Link to={`/admin/${getAdminId}/reports/user_query`} className={userQueryReportsActiveClass ? "admin-header-menu-active-link" : "admin-header-menu-link"}>User Query</Link>
                </div>
                <div className="admin-logout-btn-container" onClick={onClickLogoutBtn}>
                    <button className="admin-logout-btn">Logout</button>
                    <FaArrowRightFromBracket className="admin-logout-icon" />
                </div>
            </nav>
        </>
    )
}
export default AdminNavHeader