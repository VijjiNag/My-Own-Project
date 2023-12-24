import React from "react";
import AdminNavHeader from "../AdminNavHeader";
import './index.css'

const NotFound = () => {
    return (
        <div className='login-not-found-bg-container'>
                <AdminNavHeader />
                <div className="login-not-found-content-container">
                    <img className="login-page-not-found-image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" alt="page-not-found"/>
                    <h1 className="login-page-not-found-head">Page Not Found</h1>
                    <p className="login-page-not-found-desc">We are sorry, the page you requested could not be found.</p>
                </div>
            </div>
    )
}

export default NotFound