import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header'
import './index.css'

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className='home-banner-bg-container'>
                    <div className='Home-banner-content-container'>
                        <h1 className='banner-main-head'>TAKE THE FIRST STEP</h1>
                        <h1 className='banner-sub-head'>TO MANAGE YOUR ORGANIZATION WITH US</h1>
                        <Link className='get-started-btn-link' to="/get_started">
                            <button type='button' className='get-started-btn'>Get Started</button>
                        </Link>
                    </div>
                </div>
                <div className='home-card-container'>
                    <div className='home-card'>
                        <div className='home-card-head-container'>
                            <p>Registration</p>
                        </div>
                        <p className='home-card-desc'>You can register your students and manage their data. You can promote students to heigher class after complete the present class. Secure your data in our database.</p>
                    </div>
                    <div className='home-card'>
                        <div className='home-card-head-container'>
                            <p>Examinations</p>
                        </div>
                        <p className='home-card-desc'>You can schedule examinations, generate hall tickets of examinations, marks entry of students and generate progress cards of the students.</p>
                    </div>
                    <div className='home-card'>
                        <div className='home-card-head-container'>
                            <p>Accounts Management</p>
                        </div>
                        <p className='home-card-desc'>You can manage students fee, get fee reports of students, give TC and get TC reports of the students and print receipt of fee to the students.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home