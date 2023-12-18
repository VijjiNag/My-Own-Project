import React, { Component } from 'react'
import AdminNavHeader from '../AdminNavHeader'
import './index.css'

class ChangePassword extends Component {
    render() {
        return (
            <div className='admin-change-password-bg-container'>
                <AdminNavHeader />
                <div className="admin-change-password-content-container">
                    <h1>Change Password</h1>
                </div>
            </div>
        )
    }
}

export default ChangePassword