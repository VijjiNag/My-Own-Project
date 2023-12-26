import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
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
    const [emptyCollegeDetails, setEmptyCollegeDetails] = useState({collegeName : "", correspondentName : "", email : "", contactNumber : "",
    street : "", villageOrTown : "", city : "", district : "", stateName : "", pinCode : "", enrollForDays : "", validUpToDate : "", password : "",
    confirmPassword : "", avatarUrl : ""})

    const validDate = validUpToDate.slice(8, 10)
    const validMonth = validUpToDate.slice(5, 7)
    const validYear = validUpToDate.slice(0, 4)
    const validUpTo = validDate + "-" + validMonth + "-" + validYear

    const onChangeCollegeName = event => {
        setCollegeName(() => event.target.value.toUpperCase())
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
        setAvatarUrl(() => event.target.files[0])
        setImagePreview(() => URL.createObjectURL(event.target.files[0]))
    }
    const onSubmitCollegeRegisterForm = async (event) => {
        event.preventDefault()
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
    const renderCollegeRegistrationForm = () => {
        const isPasswordMatched = password !== confirmPassword
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
                            <input value={contactNumber} className='college-reg-input' id='college-contact-number' type='tel' placeholder='CONTACT NUMBER' onChange={onChangeContactNumber} pattern='[0-9]{10}' required />
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
                            <input value={pinCode} className='college-reg-input' id='college-pin-code' type='tel' placeholder='PIN CODE' onChange={onChangePinCode} pattern='[0-9]{6}' required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-enroll'>Enroll For (in days) </label>
                            <input value={enrollForDays} className='college-reg-input' id='college-enroll' type='tel' placeholder='NUMBER OF DAYS' onChange={onChangeEnrollForDays} required />
                        </div>
                        <div className='college-reg-form-input-container'>
                            <label className='college-reg-label' htmlFor='college-valid-upto'>Valid upto</label>
                            <input value={validUpToDate} className='college-reg-input' id='college-valid-upto' type='date' placeholder='VALID UPTO' onChange={onChangeValidUpTo} required />
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
                            {isPasswordMatched && <p className='err-msg'>{errMsgPassword}</p>}
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
                                <button type='button' className={`${apiStatusUpload === apiStatusUploadConstants.inProgress ? 'upload-btn-not-allowed' : 'upload-btn'}`} onClick={onUploadImage}>{apiStatusUpload === apiStatusUploadConstants.inProgress ? (renderLoadingView()) : "Upload"}</button>
                                {showImgUploadSucces && <p className='success-msg-college-reg'>{imgUploadSuccess}</p>}
                                {showEmptyImgError && <p className='error-msg-college-reg'>{emptyImgError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='college-reg-btn-container'>
                        <button className='college-register-btn' type='submit'>Register</button>
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
                colors={['#BFBDBE', '#BFBDBE', '#BFBDBE', '#BFBDBE', '#BFBDBE']}
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