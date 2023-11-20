import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../AdminHeader'
import './index.css'

class AdminReports extends Component {
    render() {
        return (
            <div>
                <AdminHeader/>
                <div className='no-data-found-container'>
                    <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found'/>
                    <h1 className='no-data-found-head'>No Data Found</h1>
                    <p className='no-data-found-desc'>We could not find any schools. Register the schools using below link.</p>
                    <Link to="/admin/school_register" className='register-btn-container'>
                        <button type='button' className='register-btn'>School Registration</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default AdminReports