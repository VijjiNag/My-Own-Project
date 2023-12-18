import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdminNavHeader from "../AdminNavHeader";
import AdminContext from "../../context/AdminContext";
import './index.css'

const AdminHome = () => {
    return (
        <div className="admin-home-bg-container">
            <AdminNavHeader />
            <div className="admin-home-content-container">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default AdminHome