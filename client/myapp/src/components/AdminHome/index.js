import React, {useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdminHeader from "../AdminHeader";
import AdminContext from "../../context/AdminContext";
import './index.css'

const AdminHome = () => {
    return (
        <>
            <AdminHeader />
            <h1>Home</h1>
        </>
    )
}

export default AdminHome