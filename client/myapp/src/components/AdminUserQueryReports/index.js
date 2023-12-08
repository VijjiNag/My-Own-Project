import React, { Component } from "react";
import Cookies from "js-cookie";
import { RotatingLines } from 'react-loader-spinner';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { IoSearchSharp } from "react-icons/io5";
import AdminHeader from "../AdminHeader";
import AdminUserQueryItem from "../AdminUserQueryItem";
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class AdminUserQueryReports extends Component {
    state = {
        userQueryDetails: [],
        activePageNumber: 1,
        limit: 10,
        activePage: 1,
        totalPages: 3,
        searchInput: "",
        apiStatus: apiStatusConstants.initial,
    }


    componentDidMount() {
        this.getUserQueryDetails()
    }

    getUserQueryDetails = async () => {
        const { activePage, limit, searchInput } = this.state
        const datetime = new Date();
        const newDate = ("0" + datetime.getDate()).slice(-2);
        const newMonth = ("0" + (datetime.getMonth() + 1)).slice(-2)
        const newYear = datetime.getFullYear()
        const queryDate = newDate + "-" + newMonth + "-" + newYear
        this.setState({
            apiStatus: apiStatusConstants.inProgress
        })
        const jwtToken = Cookies.get("jwt_token")
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
            this.setState({
                userQueryDetails: updatedData,
                apiStatus: apiStatusConstants.success
            })
        } else {
            this.setState({
                apiStatus: apiStatusConstants.failure
            })
        }

    }

    onChangeQuerySearch = event => {
        this.setState({ searchInput: event.target.value }, this.getUserQueryDetails)
        this.renderSearchQueryResults()
    }

    renderSearchQueryResults = () => {
        const { userQueryDetails, searchInput } = this.state
        const searchResults = userQueryDetails.filter(eachList => eachList.organizationName.toLowerCase().includes(searchInput.toLowerCase()))
        this.setState({ userQueryDetails: searchResults })
    }


    renderUserQueryDetails = () => {
        const { userQueryDetails } = this.state
        const isEmpty = userQueryDetails.length === 0

        return (
            <>
                {isEmpty ? (
                    <div className='no-data-found-container'>
                        <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found' />
                        <h1 className='no-data-found-head'>No Data Found</h1>
                        <p className='no-data-found-desc'>We could not find any user query data. Please try after sometime.</p>
                    </div>
                ) : (
                    <>
                        <ul className="user-query-list-container">
                            {userQueryDetails.map(eachQuery => (
                                <AdminUserQueryItem userQuery={eachQuery} key={eachQuery.id} />
                            ))}
                        </ul>
                    </>
                )}
            </>
        )
    }


    onClickPageDecrement = () => {
        const { activePageNumber } = this.state
        if (activePageNumber > 1) {
            this.setState(prevState => ({
                activePage: prevState.activePage - 1,
                activePageNumber: prevState.activePageNumber - 1
            }), this.getUserQueryDetails)
        }
    }

    onClickPageIncrement = () => {
        const { activePageNumber, totalPages } = this.state
        if (activePageNumber < totalPages) {
            this.setState(prevState => ({
                activePage: prevState.activePage + 1,
                activePageNumber: prevState.activePageNumber + 1
            }), this.getUserQueryDetails)
        }
    }

    renderLoadingView = () => {
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

    renderFailureView = () => {
        return (
            <div className='no-data-found-container'>
                <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt='no-data-found' />
                <h1 className='no-data-found-head'>Oops! Something Went Wrong</h1>
                <p className='no-data-found-desc'>We cannot seem to find the page you are looking for.</p>
                <button type="button" className="user-query-retry-btn" onClick={this.retryUserQuery}>Retry</button>
            </div>
        )
    }

    retryUserQuery = () => {
        this.getUserQueryDetails()
    }

    onClickPrintQueryReports = () => {
        window.print()
    }

    renderApiStatusView = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderUserQueryDetails()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default:
                return null
        }
    }

    render() {
        const { activePageNumber, totalPages, searchInput, userQueryDetails } = this.state
        const isEmpty = userQueryDetails.length !== 0
        return (
            <div>
                <AdminHeader />
                <div className="user-query-reports-container">
                    <h1 className="user-query-reports-head">User Query Reports</h1>
                    <div className="query-search-container">
                        <div className="input-container">
                            <IoSearchSharp className="query-search-icon" />
                            <input value={searchInput} className="query-search-input" type="search" id="query-search" placeholder="Search" onChange={this.onChangeQuerySearch} />
                        </div>
                    </div>
                    <div className="user-query-reports-table-container">
                        <div className="user-query-table-head-container">
                            <p className="school-name">Organization Name</p>
                            <p className="correspondent-name">Correspondent Name</p>
                            <p className="email">Email</p>
                            <p className="contact-number">Contact Number</p>
                            <p className="address">Address</p>
                        </div>
                        {this.renderApiStatusView()}
                    </div>
                </div>
                {isEmpty && (
                    <div className="print-container">
                        <div className="page-numbers-container">
                            <button type="button" className="page-btn" onClick={this.onClickPageDecrement}>
                                <IoIosArrowDropleftCircle className="page-icon" />
                            </button>
                            <p className="total-pages">{activePageNumber} of {totalPages}</p>
                            <button type="button" className="page-btn" onClick={this.onClickPageIncrement}>
                                <IoIosArrowDroprightCircle className="page-icon" />
                            </button>
                        </div>
                        <button type="button" className="query-reports-print-btn" onClick={this.onClickPrintQueryReports}>Print</button>
                    </div>
                )}
            </div>
        )
    }
}

export default AdminUserQueryReports