import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import AdminHeader from '../AdminHeader'
import './index.css'

const SchoolRegisterForm = () => {
    const params = useParams()
    const adminId = params.admin_id
    const [schoolName, setSchoolName] = useState("")
    const [correspondentName, setCorrespondentName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [street, setStreet] = useState("")
    const [villageOrTown, setVillageOrTown] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [stateName, setStateName] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [enrollForDays, setEnrollForDays] = useState("")
    const [validUpTo, setValidUpTo] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [emptySchoolDetails, setEmptySchoolDetails] = useState({schoolName : "", correspondentName : "", email : "", contactNumber : "",
    street : "", villageOrTown : "", city : "", district : "", stateName : "", pinCode : "", enrollForDays : "", validUpTo : "", password : "",
    confirmPassword : "", avatarUrl : ""})

    const onChangeSchoolName = event => {
        setSchoolName(() => event.target.value.toUpperCase())
    }

    const onChangeCorrespondentName = event => {
        setCorrespondentName(() => event.target.value.toUpperCase())
    }

    const onChangeEmail = event => {
        setEmail(() => event.target.value)
    }

    const onChangeContactNumber = event => {
        setContactNumber(() => event.target.value)
    }

    const onChangeStreet = event => {
        setStreet(() => event.target.value.toUpperCase())
    }

    const onChangeVillageOrTown = event => {
        setVillageOrTown(() => event.target.value.toUpperCase())
    }

    const onChangeCity = event => {
        setCity(() => event.target.value.toUpperCase())
    }

    const onChangeDistrict = event => {
        setDistrict(() => event.target.value.toUpperCase())
    }

    const onChangeState = event => {
        setStateName(() => event.target.value.toUpperCase())
    }

    const onChangePinCode = event => {
        setPinCode(() => event.target.value)
    }

    const onChangeEnrollForDays = event => {
        setEnrollForDays(() => event.target.value)
    }

    const onChangeValidUpTo = event => {
        setValidUpTo(() => event.target.value)
    }

    const onChangeCreatePassword = event => {
        setPassword(() => event.target.value)
    }

    const onChangeConfirmPassword = event => {
        setConfirmPassword(() => event.target.value)
    }

    const onChangeAvatarUrl = event => {
        const url = URL.createObjectURL(event.target.files[0]);
        setAvatarUrl(() => url)
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

    const onSubmitSchoolRegisterForm = async event => {
        event.preventDefault()
        setEmptySchoolDetails({schoolName, correspondentName, email, contactNumber, street, villageOrTown, city, district, stateName, pinCode, enrollForDays, validUpTo, password, confirmPassword, avatarUrl})
        setSchoolName("")
        setCorrespondentName("")
        setEmail("")
        setContactNumber("")
        setStreet("")
        setVillageOrTown("")
        setCity("")
        setDistrict("")
        setStateName("")
        setPinCode("")
        setEnrollForDays("")
        setValidUpTo("")
        setPassword("")
        setConfirmPassword("")
        setAvatarUrl("")
        const jwtToken = Cookies.get("jwt_token")
        const schoolDetails = { schoolName, correspondentName, email, contactNumber, street, villageOrTown, city, district, stateName, pinCode, enrollForDays, validUpTo, password, avatarUrl, adminId }
        const url = "http://localhost:3009/schools"
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'POST',
            body: JSON.stringify(schoolDetails),
        }
        if (password === confirmPassword) {
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess(data.success_msg)
            } else {
                onSubmitFailure(data.error_msg)
            }
        } else {
            setErrMsgPassword(() => "Password doesn't matched")
        }
    }

    const renderSchoolRegistrationForm = () => {
        const isPasswordMatched = password !== confirmPassword
        return (
            <div className='school-reg-container'>
                <form className='school-reg-form-container' onSubmit={onSubmitSchoolRegisterForm}>
                    <div className='school-reg-form-row-container'>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-name'>School Name</label>
                            <input value={schoolName} className='school-reg-input' id='school-name' type='text' placeholder='SCHOOL NAME' onChange={onChangeSchoolName} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-correspondent-name'>Correspondent Name</label>
                            <input value={correspondentName} className='school-reg-input' id='school-correspondent-name' type='text' placeholder='CORRESPONDENT NAME' onChange={onChangeCorrespondentName} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-email'>Email</label>
                            <input value={email} className='school-reg-input' id='school-email' type='email' placeholder='EMAIL' onChange={onChangeEmail} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-contact-number'>Contact Number</label>
                            <input value={contactNumber} className='school-reg-input' id='school-contact-number' type='tel' placeholder='CONTACT NUMBER' onChange={onChangeContactNumber} pattern='[0-9]{10}' required />
                        </div>
                    </div>
                    <div className='school-reg-form-row-container'>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-street'>Street</label>
                            <input value={street} className='school-reg-input' id='school-street' type='text' placeholder='STREET' onChange={onChangeStreet} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-village-town'>Village/Town</label>
                            <input value={villageOrTown} className='school-reg-input' id='school-village-town' type='text' placeholder='VILLAGE/TOWN' onChange={onChangeVillageOrTown} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-city'>City</label>
                            <input value={city} className='school-reg-input' id='school-city' type='text' placeholder='CITY' onChange={onChangeCity} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-district'>District</label>
                            <input value={district} className='school-reg-input' id='school-district' type='text' placeholder='DISTRICT' onChange={onChangeDistrict} required />
                        </div>
                    </div>
                    <div className='school-reg-form-row-container'>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-state'>State</label>
                            <input value={stateName} className='school-reg-input' id='school-state' type='text' placeholder='STATE' onChange={onChangeState} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-pin-code'>Pin Code</label>
                            <input value={pinCode} className='school-reg-input' id='school-pin-code' type='tel' placeholder='PIN CODE' onChange={onChangePinCode} pattern='[0-9]{6}' required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-enroll'>Enroll For (in days) </label>
                            <input value={enrollForDays} className='school-reg-input' id='school-enroll' type='tel' placeholder='NUMBER OF DAYS' onChange={onChangeEnrollForDays} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-valid-upto'>Valid upto</label>
                            <input value={validUpTo} className='school-reg-input' id='school-valid-upto' type='date' placeholder='VALID UPTO' onChange={onChangeValidUpTo} required />
                        </div>
                    </div>
                    <div className='school-reg-form-row-container'>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-create-password'>Create Password</label>
                            <input value={password} className='school-reg-input' id='school-create-password' type='password' placeholder='CREATE PASSWORD' onChange={onChangeCreatePassword} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-confirm-password'>Confirm Password</label>
                            <input value={confirmPassword} className='school-reg-input' id='school-confirm-password' type='password' placeholder='CONFIRM PASSWORD' onChange={onChangeConfirmPassword} required />
                            {isPasswordMatched && <p className='err-msg'>{errMsgPassword}</p>}
                        </div>
                        <div className='school-reg-form-row-container'>
                            <div className='school-reg-form-input-container'>
                                <label className='school-reg-label' htmlFor='school-logo'>Upload Logo</label>
                                <div className='school-logo-container'>
                                    <input id='school-logo' type='file' placeholder='LOGO' onChange={onChangeAvatarUrl} />
                                    <img className='school-logo-img' src={avatarUrl} alt='school-logo' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='school-reg-btn-container'>
                        <button className='school-register-btn' type='submit'>Register</button>
                    </div>
                    {showSubmitSuccess && <p className='success-msg-school-reg'>{successMsg}</p>}
                    {showSubmitError && <p className='error-msg-school-reg'>{errorMsg}</p>}
                </form>
            </div>
        )
    }
    return (
        <div>
            <AdminHeader />
            <div className='school-register-bg-container'>
                <h1 className='school-reg-head'>School Registration</h1>
                {renderSchoolRegistrationForm()}
            </div>
        </div>
    )
}

export default SchoolRegisterForm