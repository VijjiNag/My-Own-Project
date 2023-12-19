import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AdminNavHeader from '../AdminNavHeader'
import './index.css'

const ChangePassword = () => {
    const params = useParams()
    const adminId = params.admin_id
    const [oldPassword, setOldPassword] = useState("")
    const [createNewPassword, setCreateNewPassword] = useState("")
    const [confirmChangePassword, setConfirmChangePassword] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [emptyChangePasswordDetails, setEmptyChangePasswordDetails] = useState({oldPassword : "", createNewPassword : "", confirmChangePassword : ""})

    const onClickShowPasswordBtnConfirm = () => {
        setShowPasswordConfirm(() => !showPasswordConfirm)
    }

    const onChangePasswordOld = event => {
        setOldPassword(() => event.target.value)
    }

    const onChangePasswordNew = event => {
        setCreateNewPassword(() => event.target.value)
    }

    const onChangePasswordConfirm = event => {
        setConfirmChangePassword(() => event.target.value)
    }

    const onSubmitSuccess = successMsg => {
        setShowSubmitSuccess(() => true)
        setShowSubmitError(() => false)
        setSuccessMsg(() => successMsg)
    }

    const onSubmitFailure = errorMsg => {
        setShowSubmitError(() => true)
        setShowSubmitSuccess(() => false)
        setErrorMsg(() => errorMsg)
        
    }

    const onSubmitChangePassword = async event => {
        event.preventDefault()
        const adminDetails = {oldPassword, createNewPassword, confirmChangePassword}
        setEmptyChangePasswordDetails({oldPassword, createNewPassword, confirmChangePassword})
        setOldPassword("")
        setCreateNewPassword("")
        setConfirmChangePassword("")
        const jwtToken = Cookies.get("jwt_token")
        const url = `http://localhost:3009/admin/${adminId}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'PUT',
            body: JSON.stringify(adminDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            onSubmitSuccess(data.success_msg)
        } else {
            onSubmitFailure(data.error_msg)
        }
    }

    const renderChangePasswordDetails = () => {
        return (
            <form className='change-password-form-container' onSubmit={onSubmitChangePassword}>
                <label htmlFor='change-password-old' className='change-password-label'>OLD PASSWORD</label>
                <div className='change-password-input-container'>
                    <input className='change-password-input' value={oldPassword} type='password' id='change-password-old' placeholder='Enter Old Password' onChange={onChangePasswordOld} />
                </div>
                <label htmlFor='change-password-new' className='change-password-label'>CREATE NEW PASSWORD</label>
                <div className='change-password-input-container'>
                    <input className='change-password-input' value={createNewPassword} type='password' id='change-password-new' placeholder='Enter New Password' onChange={onChangePasswordNew} />
                </div>
                <label htmlFor='change-password-confim' className='change-password-label'>CONFIRM NEW PASSWORD</label>
                <div className='change-password-input-container'>
                    <input className='change-password-input' value={confirmChangePassword} type={showPasswordConfirm ? 'text' : 'password'} id='change-password-confirm' placeholder='Enter Confirm Password' onChange={onChangePasswordConfirm} />
                    <button className='show-change-password-btn' type='button' onClick={onClickShowPasswordBtnConfirm}>{showPasswordConfirm ? <FaEyeSlash className='show-change-password-icon' /> : <FaEye className='show-change-password-icon' />}</button>
                </div>
                <div className='change-password-btn-container'>
                    <button type='submit' className='change-password-btn'>Change Password</button>
                </div>
                {showSubmitSuccess && <p className='change-password-success-msg'>{successMsg}</p>}
                {showSubmitError && <p className='change-password-error-msg'>{errorMsg}</p>}
            </form>
        )
    }
        return (
            <div className='admin-change-password-bg-container'>
                <AdminNavHeader />
                <div className="admin-change-password-content-container">
                    <div className='change-password-input-details-container'>
                        <h1 className='change-password-head'>Change Password</h1>
                        {renderChangePasswordDetails()}
                    </div>
                </div>
            </div>
        )
}

export default ChangePassword