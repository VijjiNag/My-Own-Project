import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ColorRing } from 'react-loader-spinner';
import AdminNavHeader from '../AdminNavHeader'
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

const CollegeRegistrationForm = () => {
    const params = useParams()
    const adminId = params.admin_id
    const [collegeName, setCollegeName] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [showErrorMsgPassword, setShowErrorMsgPassword] = useState(false)
    const [showEmptyImgError, setShowEmptyImgError] = useState(false)
    const [showImgUploadSucces, setshowImgUploadSucces] = useState(false)
    const [emptyImgError, setEmptyImgError] = useState("")
    const [imgUploadSuccess, setimgUploadSuccess] = useState("")
    const [apiStatusUpload, setApiStatusUpload] = useState(apiStatusUploadConstants.initial)
    const [apiStatusRegister, setApiStatusRegister] = useState(apiStatusRegisterConstants.initial)
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
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [emptyCollegeDetails, setEmptyCollegeDetails] = useState({
        collegeName: "", correspondentName: "", email: "", contactNumber: "",
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

    const onChangeCollegeName = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);
        }
        setCollegeName(() => splitName.join(' '))
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
        let splitName = event.target.value.replace(/[^a-zA-Z0-9@_]/g, "").replaceAll(' ', '')
        setPassword(() => splitName)
    }

    const onChangeConfirmPassword = event => {
        let splitName = event.target.value.replace(/[^a-zA-Z0-9@_]/g, "").replaceAll(' ', '')
        setConfirmPassword(() => splitName)
    }

    const onChangeAvatarUrl = event => {
        setAvatarUrl(() => event.target.files[0])
        setImagePreview(() => URL.createObjectURL(event.target.files[0]))
    }
    const onSubmitCollegeRegisterForm = async (event) => {
        event.preventDefault()
        setApiStatusRegister(() => apiStatusRegisterConstants.inProgress)
        const jwtToken = Cookies.get("jwt_token")
        const collegeDetails = { collegeName, correspondentName, email, contactNumber, street, villageOrTown, city, district, stateName, pinCode, enrollForDays, validUpTo, password, avatarUrl, adminId }
        const url = "http://localhost:3009/colleges"
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'POST',
            body: JSON.stringify(collegeDetails),
        }
        if (password === confirmPassword) {
            setShowErrorMsgPassword(() => false)
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess(data.success_msg)
                setshowImgUploadSucces(() => false)
                setShowErrorMsgPassword(() => false)
                setApiStatusRegister(() => apiStatusRegisterConstants.success)

                setEmptyCollegeDetails({ collegeName, correspondentName, email, contactNumber, street, villageOrTown, city, district, stateName, pinCode, enrollForDays, validUpToDate, password, confirmPassword, avatarUrl })
                setCollegeName("")
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

    const renderCollegeRegistrationForm = () => {
        return (
            <div className='college-reg-container'>
                <form className='college-reg-form-container' onSubmit={onSubmitCollegeRegisterForm}>
                    <div className='college-reg-form-row-container'>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-name'>College Name</label>
                            <input value={collegeName} className='college-reg-input' id='college-name' type='text' placeholder='COLLEGE NAME' onChange={onChangeCollegeName} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-correspondent-name'>Correspondent Name</label>
                            <input value={correspondentName} className='college-reg-input' id='college-correspondent-name' type='text' placeholder='CORRESPONDENT NAME' onChange={onChangeCorrespondentName} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-email'>Email</label>
                            <input value={email} className='college-reg-input' id='college-email' type='email' placeholder='EMAIL' onChange={onChangeEmail} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-contact-number'>Contact Number</label>
                            <input value={contactNumber} className='college-reg-input' id='college-contact-number' type='tel' placeholder='CONTACT NUMBER' onChange={onChangeContactNumber} pattern='[0-9]{10}' maxLength="10" required />
                        </div>
                    </div>
                    <div className='college-reg-form-row-container'>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-street'>Street</label>
                            <input value={street} className='college-reg-input' id='college-street' type='text' placeholder='STREET' onChange={onChangeStreet} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='school-reg-label' htmlFor='college-village-town'>Village/Town</label>
                            <input value={villageOrTown} className='college-reg-input' id='college-village-town' type='text' placeholder='VILLAGE/TOWN' onChange={onChangeVillageOrTown} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-city'>City</label>
                            <input value={city} className='college-reg-input' id='college-city' type='text' placeholder='CITY' onChange={onChangeCity} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-district'>District</label>
                            <input value={district} className='college-reg-input' id='college-district' type='text' placeholder='DISTRICT' onChange={onChangeDistrict} required />
                        </div>
                    </div>
                    <div className='college-reg-form-row-container'>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-state'>State</label>
                            <input value={stateName} className='college-reg-input' id='college-state' type='text' placeholder='STATE' onChange={onChangeState} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-pin-code'>Pin Code</label>
                            <input value={pinCode} className='college-reg-input' id='college-pin-code' type='tel' placeholder='PIN CODE' onChange={onChangePinCode} pattern='[0-9]{6}' maxLength="6" required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-enroll'>Enroll For (in days) </label>
                            <input value={enrollForDays} className='college-reg-input' id='college-enroll' type='tel' placeholder='NUMBER OF DAYS' onChange={onChangeEnrollForDays} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-valid-upto'>Valid upto</label>
                            <input value={validUpToDate} className='college-reg-input' id='college-valid-upto' type='date' min={today} placeholder='VALID UPTO' onChange={onChangeValidUpTo} required />
                        </div>
                    </div>
                    <div className='college-reg-form-row-container'>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-create-password'>Create Password</label>
                            <input value={password} className='college-reg-input' id='college-create-password' type='password' placeholder='CREATE PASSWORD' onChange={onChangeCreatePassword} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-confirm-password'>Confirm Password</label>
                            <input value={confirmPassword} className='college-reg-input' id='college-confirm-password' type='password' placeholder='CONFIRM PASSWORD' onChange={onChangeConfirmPassword} required />
                            {showErrorMsgPassword && <p className='err-msg'>{errMsgPassword}</p>}
                        </div>
                        <div className='college-reg-form-row-container'>
                            <div className='college-reg-form-input-container'>
                                <label className='college-reg-label' htmlFor='college-logo'>Upload Logo</label>
                                <div className='college-logo-container'>
                                    <input id='college-logo' type='file' placeholder='LOGO' onChange={onChangeAvatarUrl} />
                                    {imagePreview && (<img className='college-logo-img' src={imagePreview && imagePreview} alt='college-logo' />)}
                                </div>
                            </div>
                        </div>
                        <div className='college-reg-form-row-container'>
                            <div className='college-reg-form-input-container'>
                                <button type='button' className={`${apiStatusUpload === apiStatusUploadConstants.inProgress ? 'upload-btn-college-not-allowed' : 'upload-btn-college'}`} onClick={onUploadImage}>{apiStatusUpload === apiStatusUploadConstants.inProgress ? (renderLoadingView()) : "Upload"}</button>
                                {showImgUploadSucces && <p className='success-msg-college-reg'>{imgUploadSuccess}</p>}
                                {showEmptyImgError && <p className='error-msg-college-reg'>{emptyImgError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='college-reg-btn-container'>
                        <button className={apiStatusRegister === apiStatusRegisterConstants.inProgress ? 'college-register-btn-not-allowed' : 'college-register-btn'} type='submit'>{apiStatusRegister === apiStatusRegisterConstants.inProgress ? (renderLoadingView()) : "Register"}</button>
                    </div>
                    {showSubmitSuccess && <p className='success-msg-college-reg'>{successMsg}</p>}
                    {showSubmitError && <p className='error-msg-college-reg'>{errorMsg}</p>}
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
        <div className="admin-reg-college-bg-container">
            <AdminNavHeader />
            <div className='admin-reg-college-content-container'>
                <h1 className='college-reg-head'>College Registration</h1>
                {renderCollegeRegistrationForm()}
            </div>
        </div>
    )
}

export default CollegeRegistrationForm