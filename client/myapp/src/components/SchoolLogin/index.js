import React, { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from '../Header'
import './index.css'

const SchoolLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    const onChangeUsername = event => {
        setUsername(() => event.target.value)
    }

    const onChangePassword = event => {
        setPassword(() => event.target.value)
    }

    const onClickShowPasswordBtn = () => {
        setShowPassword(prevShowPassword => (!prevShowPassword))
    }


    const onSubmitSchoolForm = async event => {
        event.preventDefault()
        const userDetails = { username, password }
    }

    const renderSchoolLoginDetails = () => {
        return (
            <div className='admin-login-form-container'>
                <div className='login-form-head-container'>
                    <img className='login-logo' src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1700608338/logo_vsucfx.png" alt='logo' />
                    <h1 className='admin-login-head'>School Login</h1>
                </div>
                <form className='login-form-container' onSubmit={onSubmitSchoolForm}>
                    <label htmlFor='username' className='label'>USERNAME</label>
                    <input className='input' value={username} type='text' id='username' placeholder='Enter Your Username' onChange={onChangeUsername} />
                    <label htmlFor='password' className='label'>PASSWORD</label>
                    <div className='password-input-container'>
                        <input className='input-password' value={password} type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Your Password' onChange={onChangePassword} />
                        <button className='show-password-btn' type='button' onClick={onClickShowPasswordBtn}>{showPassword ? <FaEye className='show-password-icon' /> : <FaEyeSlash className='show-password-icon' />}</button>
                    </div>
                    <div className='admin-login-btn-container'>
                        <button type='submit' className='login-btn'>Login</button>
                    </div>
                    {showSubmitError && <p className='error-msg'>{errorMsg}</p>}
                </form>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className='admin-login-bg-container'>
                <div className='admin-login-container'>
                    <img className='admin-img' src='https://1stop.ai/images/login-bg.png' alt='admin-login' />
                    <div className='login-details-container'>{renderSchoolLoginDetails()}</div>
                </div>
            </div>
        </>
    )
}

export default SchoolLogin