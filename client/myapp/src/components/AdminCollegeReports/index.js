import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminNavHeader from '../AdminNavHeader';
import './index.css'

const AdminCollegeReports = () => {
    const [getAdminId, setAdminId] = useState("")
    const [getAdminName, setAdminName] = useState("")
    const params = useParams()
    const adminId = params.admin_id
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
    return (
        <div className="college-reports-bg-container">
            <AdminNavHeader />
            <div className="college-reports-content-container">
                <div className='college-no-data-found-container'>
                    <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found' />
                    <h1 className='no-data-found-head'>No Data Found</h1>
                    <p className='no-data-found-desc'>We could not find any colleges. Register the college using below link.</p>
                    <Link to={`/admin/${adminId}/register/college`} className='register-btn-container'>
                        <button type='button' className='register-btn'>College Registration</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminCollegeReports