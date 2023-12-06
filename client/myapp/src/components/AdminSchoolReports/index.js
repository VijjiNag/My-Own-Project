import React, { useState, useEffect }  from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminHeader from '../AdminHeader'
import './index.css'

const AdminSchoolReports = () => {
    const [getSchools, setSchools] = useState([])
    const params = useParams()
    const adminId = params.admin_id
    useEffect(() => {
        const getSchoolDetails = async () => {
            const jwtToken = Cookies.get("jwt_token")
            const url = `http://localhost:3009/admin/${adminId}/schools/`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                const updatedData = data.schoolsList.map(eachList => ({
                    schoolName : eachList.school_name
                }))
                setSchools(() => updatedData)
            }
        }
        getSchoolDetails()
    }, [])

        return (
            <div>
                <AdminHeader/>
                <div className='no-data-found-container'>
                    <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found'/>
                    <h1 className='no-data-found-head'>No Data Found</h1>
                    <p className='no-data-found-desc'>We could not find any schools. Register the schools using below link.</p>
                    <Link to={`/admin/${adminId}/register/school`} className='register-btn-container'>
                        <button type='button' className='register-btn'>School Registration</button>
                    </Link>
                </div>
            </div>
        )
}

export default AdminSchoolReports