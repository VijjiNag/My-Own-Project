import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import AdminNavHeader from '../AdminNavHeader';
import './index.css'

const apiStatusUploadConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const apiStatusRegisterConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const SchoolRegisterForm = () => {
    const params = useParams()
    const adminId = params.admin_id
    const [schoolName, setSchoolName] = useState("")
    const [apiStatusUpload, setApiStatusUpload] = useState(apiStatusUploadConstants.initial)
    const [apiStatusRegister, setApiStatusRegister] = useState(apiStatusRegisterConstants.initial)
    const [emptyImgError, setEmptyImgError] = useState("")
    const [showEmptyImgError, setShowEmptyImgError] = useState(false)
    const [showImgUploadSucces, setshowImgUploadSucces] = useState(false)
    const [imgUploadSuccess, setimgUploadSuccess] = useState("")
    const [showErrorMsgPassword, setShowErrorMsgPassword] = useState(false)
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
    const [validUpToDate, setValidUpTo] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [emptySchoolDetails, setEmptySchoolDetails] = useState({
        schoolName: "", correspondentName: "", email: "", contactNumber: "",
        street: "", villageOrTown: "", city: "", district: "", stateName: "", pinCode: "", enrollForDays: "", validUpToDate: "", password: "",
        confirmPassword: "", avatarUrl: ""
    })

    const validDate = validUpToDate.slice(8, 10)
    const validMonth = validUpToDate.slice(5, 7)
    const validYear = validUpToDate.slice(0, 4)
    const validUpTo = validDate + "-" + validMonth + "-" + validYear

    const datetime = new Date();
    const newDate = ("0" + datetime.getDate()).slice(-2);
    const newMonth = ("0" + (datetime.getMonth() + 1)).slice(-2)
    const newYear = datetime.getFullYear()
    const today = newYear + "-" + newMonth + "-" + newDate

    const onChangeSchoolName = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setSchoolName(() => splitName.join(' '))
    }

    const onChangeCorrespondentName = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setCorrespondentName(() => splitName.join(' '))
    }

    const onChangeEmail = event => {
        let splitName = event.target.value.replace(/[^a-z0-9@_.-]/g, "")
        setEmail(() => splitName)
    }

    const onChangeContactNumber = event => {
        let splitNumber = event.target.value.replace(/[^0-9]/g, "")
        setContactNumber(() => splitNumber)
    }

    const onChangeStreet = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z0-9-/, ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);
        }
        setStreet(() => splitName.join(' '))
    }

    const onChangeVillageOrTown = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ,]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setVillageOrTown(() => splitName.join(' '))
    }

    const onChangeCity = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setCity(() => splitName.join(' '))
    }

    const onChangeDistrict = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setDistrict(() => splitName.join(' '))
    }

    const onChangeState = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);     
        }
        setStateName(() => splitName.join(' '))
    }

    const onChangePinCode = event => {
        let splitNumber = event.target.value.replace(/[^0-9]/g, "")
        setPinCode(() => splitNumber)
    }

    const onChangeEnrollForDays = event => {
        let splitNumber = event.target.value.replace(/[^0-9]/g, "")
        setEnrollForDays(() => splitNumber)
    }

    const onChangeValidUpTo = event => {
        setValidUpTo(() => event.target.value)
    }

    const onChangeCreatePassword = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z0-9@_]/g, "").replaceAll(' ','')
        setPassword(() => splitName)
    }

    const onChangeConfirmPassword = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z0-9@_]/g, "").replaceAll(' ','')
        setConfirmPassword(() => splitName)
    }

    const onChangeAvatarUrl = event => {
        setAvatarUrl(() => event.target.files[0])
        setImagePreview(() => URL.createObjectURL(event.target.files[0]))
    }

    const onUploadImage = async () => {
        setApiStatusUpload(() => apiStatusUploadConstants.inProgress)
        if (avatarUrl && (avatarUrl.type === "image/png" || avatarUrl.type === "image/jpg" || avatarUrl.type === "image/jpeg")) {
            const image = new FormData()
            image.append("file", avatarUrl)
            image.append("clound_name", "dhfmjj1j9")
            image.append("upload_preset", "abcdabcdabcd")
            const apiUrl = "https://api.cloudinary.com/v1_1/dhfmjj1j9/image/upload"
            const options = {
                method: "post",
                body: image
            }
            const response = await fetch(apiUrl, options)
            const imageData = await response.json()
            if (response.ok) {
                setAvatarUrl(() => imageData.url.toString())
                setImagePreview(() => null)
                setimgUploadSuccess(() => "Image uploaded successfully")
                setEmptyImgError(() => false)
                setApiStatusUpload(() => apiStatusUploadConstants.success)
                setshowImgUploadSucces(() => true)

            } else {
                setEmptyImgError(() => "Image upload failed")
                setApiStatusUpload(() => apiStatusUploadConstants.failure)
            }
        } else {
            setEmptyImgError(() => "Select a valid image")
            setApiStatusUpload(() => apiStatusUploadConstants.failure)
            setShowEmptyImgError(() => true)
            setshowImgUploadSucces(() => false)
        }
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
        setApiStatusRegister(() => apiStatusRegisterConstants.inProgress)
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
                setshowImgUploadSucces(() => false)
                setShowErrorMsgPassword(() => false)
                setApiStatusRegister(() => apiStatusRegisterConstants.success)

                setEmptySchoolDetails({ schoolName, correspondentName, email, contactNumber, street, villageOrTown, city, district, stateName, pinCode, enrollForDays, validUpToDate, password, confirmPassword, avatarUrl })
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
            } else {
                onSubmitFailure(data.error_msg)
                setShowEmptyImgError(() => false)
                setApiStatusRegister(() => apiStatusRegisterConstants.failure)
            }
        } else {
            setShowErrorMsgPassword(() => true)
            setErrMsgPassword(() => "Password doesn't matched")
            setApiStatusRegister(() => apiStatusRegisterConstants.failure)
        }
    }

    const renderSchoolRegistrationForm = () => {
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
                            <input value={contactNumber} className='school-reg-input' id='school-contact-number' type='tel' maxLength='10' placeholder='CONTACT NUMBER' onChange={onChangeContactNumber} pattern='[0-9]{10}' required />
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
                            <input value={pinCode} className='school-reg-input' id='school-pin-code' type='tel' maxLength='6' placeholder='PIN CODE' onChange={onChangePinCode} pattern='[0-9]{6}' required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-enroll'>Enroll For (in days) </label>
                            <input value={enrollForDays} className='school-reg-input' id='school-enroll' type='tel' placeholder='NUMBER OF DAYS' onChange={onChangeEnrollForDays} required />
                        </div>
                        <div className='school-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='school-valid-upto'>Valid upto</label>
                            <input value={validUpToDate} className='school-reg-input' id='school-valid-upto' type='date' min={today} placeholder='VALID UPTO' onChange={onChangeValidUpTo} required />
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
                            {showErrorMsgPassword && <p className='err-msg'>{errMsgPassword}</p>}
                        </div>
                        <div className='school-reg-form-row-container'>
                            <div className='school-reg-form-input-container'>
                                <label className='school-reg-label' htmlFor='school-logo'>Upload Logo</label>
                                <div className='school-logo-container'>
                                    <input id='school-logo' type='file' accept='image/png, image/jpeg' name='image' placeholder='LOGO' onChange={onChangeAvatarUrl} />
                                    {imagePreview && (<img className='school-logo-img' src={imagePreview && imagePreview} alt='school-logo' />)}
                                </div>
                            </div>
                        </div>
                        <div className='school-reg-form-row-container'>
                            <div className='school-reg-form-input-container'>
                                <button type='button' className={`${apiStatusUpload === apiStatusUploadConstants.inProgress ? 'upload-btn-not-allowed' : 'upload-btn'}`} onClick={onUploadImage} disabled={apiStatusUpload === apiStatusUploadConstants.inProgress}>{apiStatusUpload === apiStatusUploadConstants.inProgress ? (renderLoadingView()) : "Upload"}</button>
                                {showImgUploadSucces && <p className='success-msg-school-reg'>{imgUploadSuccess}</p>}
                                {showEmptyImgError && <p className='error-msg-school-reg'>{emptyImgError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='school-reg-btn-container'>
                        <button className={`${apiStatusRegister === apiStatusRegisterConstants.inProgress ? 'school-register-btn-not-allowed' : 'school-register-btn'}`} type='submit' disabled={apiStatusRegister === apiStatusRegisterConstants.inProgress}>{apiStatusRegister === apiStatusRegisterConstants.inProgress ? (renderLoadingView()) : "Register"}</button>
                    </div>
                    {showSubmitSuccess && <p className='success-msg-school-reg'>{successMsg}</p>}
                    {showSubmitError && <p className='error-msg-school-reg'>{errorMsg}</p>}
                </form>
            </div>
        )
    }

    const renderLoadingView = () => {
        return (
            <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#D4D3D3', '#D4D3D3', '#D4D3D3', '#D4D3D3', '#D4D3D3']}
            />
        )
    }

    return (
        <div className='admin-reg-school-bg-container'>
            <AdminNavHeader />
            <div className='admin-reg-school-content-container'>
                <h1 className='school-reg-head'>School Registration</h1>
                {renderSchoolRegistrationForm()}
            </div>
        </div>
    )
}

export default SchoolRegisterForm