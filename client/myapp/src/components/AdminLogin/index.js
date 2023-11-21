import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from '../Header'
import './index.css'

const AdminLogin = () => {
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

    const onSubmitSuccess = jwtToken => {
        Cookies.set("jwt_token", jwtToken, { expires: 30 })
        navigate("/admin")
    }

    const onSubmitFailure = errorMsg => {
        setShowSubmitError(() => true)
        setErrorMsg(errorMsg)
    }

    


    const onSubmitAdminForm = async event => {
        event.preventDefault()
        const userDetails = { username, password }
        const url = "http://localhost:3009/admin_login"
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            onSubmitSuccess(data.jwt_token)
            console.log(response)
        } else {
            onSubmitFailure(data.error_msg)
        }

    }


    const renderAdminLoginDetails = () => {
        const jwtToken = Cookies.get("jwt_token")
        if (jwtToken !== undefined) {
            return <Navigate replace to="/admin" />
        }
        return (
            <div className='admin-login-form-container'>
                <h1 className='admin-login-head'>Admin Login</h1>
                <form className='login-form-container' onSubmit={onSubmitAdminForm}>
                    <label htmlFor='username' className='label'>USERNAME</label>
                    <input className='input' value={username} type='text' id='username' placeholder='Enter Your Username' onChange={onChangeUsername} />
                    <label htmlFor='password' className='label'>PASSWORD</label>
                    <div className='password-input-container'>
                        <input className='input-password' value={password} type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Your Password' onChange={onChangePassword} />
                        <button className='show-password-btn' type='button' >{showPassword ? <FaEye className='show-password-icon' /> : <FaEyeSlash className='show-password-icon' />}</button>
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
                    <img className='admin-img' src='https://www.mrisoftware.com/uk/wp-content/uploads/2022/02/XWMS_Lease-Admin-1024x812.png' alt='admin-login' />
                    <div className='login-details-container'>{renderAdminLoginDetails()}</div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin