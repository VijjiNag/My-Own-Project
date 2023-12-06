import React, { useState } from 'react'
import Header from '../Header'
import './index.css'

const GetStarted = () => {
    const [organizationName, setOrganizationName] = useState("")
    const [correspondentName, setCorrespondentName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const [emptyUserDetails, setEmptyUserDetails] = useState({organizationName : '', correspondentName : '', email : '', contactNumber : '', address : ''})
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const onChangeOrganizationName = event => {
        setOrganizationName(() => event.target.value.toUpperCase())
    }

    const onchangeCorrespondentName = event => {
        setCorrespondentName(() => event.target.value.toUpperCase())
    }

    const onchangeEmail = event => {
        setEmail(() => event.target.value)
    }

    const onchangeContact = event => {
        setContactNumber(() => event.target.value)
    }

    const onChangeAddress = event => {
        setAddress(() => event.target.value.toUpperCase())
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

    const onSubmitQueryForm = async event => {
        event.preventDefault()
        setEmptyUserDetails({organizationName, correspondentName, email, contactNumber, address})
        setOrganizationName("")
        setCorrespondentName("")
        setEmail("")
        setContactNumber("")
        setAddress("")
        const userDetails = { organizationName, correspondentName, email, contactNumber, address }
        const url = "http://localhost:3009/user_query"
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
        if (response.ok) {
            onSubmitSuccess(data.success_msg)
        } else {
            onSubmitFailure(data.error_msg)
        }
    }
    const renderQueryForm = () => {
        return (
            <div className='home-query-form-container'>
                <h1 className='user-query-head'>User Query Form</h1>
                <form className='query-form' onSubmit={onSubmitQueryForm}>
                    <label htmlFor='organization-name' className='query-label'>Organization Name</label>
                    <input value={organizationName} type='text' id='organization-name' className='query-input' placeholder='ORGANIZATION NAME' onChange={onChangeOrganizationName} required />
                    <label htmlFor='correspondent-name' className='query-label'>Correspondent Name</label>
                    <input value={correspondentName} type='text' id='correspondent-name' className='query-input' placeholder='CORRESPONDENT NAME' onChange={onchangeCorrespondentName} required />
                    <label htmlFor='email' className='query-label'>Email</label>
                    <input value={email} type='email' id='email' className='query-input' placeholder='EMAIL' onChange={onchangeEmail} required />
                    <label htmlFor='contact' className='query-label'>Contact Number</label>
                    <input value={contactNumber} type='tel' id='contact' className='query-input' placeholder='CONTACT' pattern='[0-9]{10}' onChange={onchangeContact} required />
                    <label htmlFor='address' className='query-label'>Organization Address</label>
                    <input value={address} type='text' id='address' className='query-input' placeholder='ORGANIZATION ADDRESS' onChange={onChangeAddress} required />
                    <div className='query-form-btn-container'>
                        <button className='query-form-btn' type='submit'>Submit</button>
                    </div>
                </form>
                {showSubmitSuccess && <p className='success-msg'>{successMsg}</p>}
                {showSubmitError && <p className='error-msg'>{errorMsg}</p>}
            </div>
        )
    }
    return (
        <div>
            <Header />
            <div className='query-form-bg-container'>
                <img className='query-img' src="https://png.pngtree.com/png-clipart/20220726/original/pngtree-team-work-meeting-illustration-image-png-image_8416291.png" alt='query-img' />
                <div className='query-form-container'>{renderQueryForm()}</div>
            </div>
        </div>
    )
}

export default GetStarted