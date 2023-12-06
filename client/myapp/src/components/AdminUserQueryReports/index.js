import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { RotatingLines } from 'react-loader-spinner';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io'
import AdminHeader from "../AdminHeader";
import AdminUserQueryItem from "../AdminUserQueryItem";
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const AdminUserQueryReports = () => {
    const [userQueryDetails, setUserQueryDetails] = useState([])
    const [activePageNumber, setActivePageNumber] = useState(1)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [activePage, setActivePage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [searchInput, setSearchInput] = useState("")
    const numberOfUserQueries = userQueryDetails.length
    const totalPages = Math.ceil(numberOfUserQueries / limit)
    const isEmpty = numberOfUserQueries === 0
    useEffect(() => {
        const getUserQueryDetails = async () => {
            const jwtToken = Cookies.get("jwt_token")
            setApiStatus(() => apiStatusConstants.inProgress)
            const offset = (activePage - 1) * limit
            const url = `http://localhost:3009/user_query?offset=${offset}&limit=${limit}&search=${searchInput}`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                const updatedData = data.queries.map(eachList => ({
                    id: eachList.id,
                    organizationName: eachList.organization_name,
                    correspondentName: eachList.correspondent_name,
                    email: eachList.email,
                    contactNumber: eachList.contact_number,
                    address: eachList.address
                }))
                setUserQueryDetails(() => updatedData)
                setApiStatus(() => apiStatusConstants.success)
            } else {
                setApiStatus(() => apiStatusConstants.failure)
            }

        }
        getUserQueryDetails()
    }, [])

    const renderUserQueryDetails = () => {
        return (
            <>
                <ul className="user-query-list-container">
                    <div className="user-query-table-head-container">
                        <p className="school-name">Organization Name</p>
                        <p className="correspondent-name">Correspondent Name</p>
                        <p className="email">Email</p>
                        <p className="contact-number">Contact Number</p>
                        <p className="address">Address</p>
                    </div>
                    {userQueryDetails.map(eachQuery => (
                        <AdminUserQueryItem userQuery={eachQuery} key={eachQuery.id} />
                    ))}
                </ul>
            </>
        )
    }

    const renderNoDataFoundView = () => {
        return (
            <div className='no-data-found-container'>
                <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found' />
                <h1 className='no-data-found-head'>No Data Found</h1>
                <p className='no-data-found-desc'>We could not find any user query data. Please try after.</p>
            </div>
        )
    }

    const onClickPageDecrement = () => {
        if (activePageNumber > 1) {
            setActivePageNumber((prevState) => prevState - 1)
        }
    }

    const onClickPageIncrement = () => {
        if (activePageNumber < totalPages) {
            setActivePageNumber((prevState) => prevState + 1)
        }
    }

    const renderLoadingView = () => {
        return (
            <div className="loader-container">
                <RotatingLines
                    strokeColor="#72024D"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }

    const renderFailureView = () => { }

    const renderApiStatusView = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderUserQueryDetails()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            default:
                return null
        }
    }

    return (
        <div>
            <AdminHeader />
            <div className="user-query-reports-container">
                {isEmpty ? renderNoDataFoundView() : (
                    <>
                        <h1 className="user-query-reports-head">User Query Reports</h1>
                        <div className="user-query-reports-table-container">
                            {renderApiStatusView()}
                            <div className="page-numbers-container">
                                <button type="button" className="page-btn" onClick={onClickPageDecrement}>
                                    <IoIosArrowDropleftCircle className="page-icon" />
                                </button>
                                <p className="total-pages">{activePageNumber} of {totalPages}</p>
                                <button type="button" className="page-btn" onClick={onClickPageIncrement}>
                                    <IoIosArrowDroprightCircle className="page-icon" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminUserQueryReports