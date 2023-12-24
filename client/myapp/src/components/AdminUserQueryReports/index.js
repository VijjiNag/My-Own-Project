import React, { Component } from "react";
import Cookies from "js-cookie";
import { RotatingLines } from 'react-loader-spinner';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import AdminUserQueryItem from "../AdminUserQueryItem";
import AdminNavHeader from "../AdminNavHeader";
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
        currentItems: [],
        currentPage: 0,
        activePageNumber: 1,
        pageSige: 10,
        pageCount: "",
        searchInput: "",
        apiStatus: apiStatusConstants.initial,
    }


    componentDidMount() {
        this.getUserQueryDetails()
        this.onPageChange(0)
    }

    getUserQueryDetails = async () => {
        const { activePage, pageSige, searchInput, userQueryDetails } = this.state
        const datetime = new Date();
        const newDate = ("0" + datetime.getDate()).slice(-2);
        const newMonth = ("0" + (datetime.getMonth() + 1)).slice(-2)
        const newYear = datetime.getFullYear()
        const queryDate = newDate + "-" + newMonth + "-" + newYear
        this.setState({
            apiStatus: apiStatusConstants.inProgress
        })
        const jwtToken = Cookies.get("jwt_token")
        //const offset = (activePage - 1) * limit
        const url = `http://localhost:3009/user_query?search=${searchInput}`
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
                currentItems: updatedData.slice(0, pageSige),
                pageCount: Math.ceil(updatedData.length / pageSige),
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
        const { currentItems } = this.state
        const isEmpty = currentItems.length === 0

        return (
            <>
                {isEmpty ? (
                    <div className='query-no-data-found-container'>
                        <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt='no-data-found' />
                        <h1 className='no-data-found-head'>No Data Found</h1>
                        <p className='no-data-found-desc'>We could not find any user query data. Please try after sometime.</p>
                    </div>
                ) : (
                        <ul className="user-query-list-container">
                            {currentItems.map((eachQuery, index) => (
                                <AdminUserQueryItem userQuery={eachQuery} key={index} />
                            ))}
                        </ul>
                )}
            </>
        )
    }


    /*onClickPageDecrement = () => {
        const { activePageNumber } = this.state
        if (activePageNumber > 1) {
            this.setState(prevState => ({
                activePage: prevState.activePage - 1,
                activePageNumber: prevState.activePageNumber - 1
            }), this.getUserQueryDetails)
        }
    }*/

    /*onClickPageIncrement = () => {
        const { activePageNumber, totalPages } = this.state
        if (activePageNumber < totalPages) {
            this.setState(prevState => ({
                activePage: prevState.activePage + 1,
                activePageNumber: prevState.activePageNumber + 1
            }), this.getUserQueryDetails)
        }
    }*/

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
            <div className='user-query-no-data-found-container'>
                <img className='no-data-found-img' src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt='no-data-found' />
                <h1 className='no-data-found-head'>Oops! Something Went Wrong</h1>
                <p className='no-data-found-desc'>We cannot seem to find the page you are looking for.</p>
                <button type="button" className="user-query-retry-btn" onClick={this.retryUserQuery}>Retry</button>
            </div>
        )
    }

    onPageChange = (index) => {
        const { userQueryDetails, pageSige } = this.state
        const currentList = userQueryDetails.slice(index * pageSige, pageSige * (index + 1))
        this.setState({ currentPage: index, currentItems: currentList })
    }

    retryUserQuery = () => {
        this.getUserQueryDetails()
    }

    onClickPrintQueryReports = () => {
        window.print()
    }

    onChangePageSize = event => {
        const { userQueryDetails } = this.state
        this.setState({ pageSige: parseInt(event.target.value), pageCount: Math.ceil(userQueryDetails.length / parseInt(event.target.value)) }, this.getUserQueryDetails)
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
        const { activePageNumber, searchInput, userQueryDetails, pageCount, currentPage, totalPages, pageSige } = this.state
        const isEmpty = userQueryDetails.length !== 0
        //let date1 = new Date("12/09/2023");
        //let date2 = new Date("01/08/2024");
        //let Difference_In_Time = date2.getTime() - date1.getTime();
        //let Difference_In_Days =
        //  Math.round(Difference_In_Time / (1000 * 3600 * 24));
        //console.log("Total number of days between dates:\n" +
        //date1.toDateString() + " and " + date2.toDateString() +
        //" is: " + Difference_In_Days + " days");
        //console.log(date1.toDateString())
        return (
            <div className="admin-user-query-reports-bg-container">
                <AdminNavHeader />
                <div className="user-query-reports-content-container">
                    <div className="query-reports-header-container">
                        <h1 className="user-query-reports-head">User Query Reports</h1>
                        <div className="query-search-container">
                            <div className="page-drop-down-container">
                                <label className="pages-label" htmlFor="pages">No. of Lists</label>
                                <select className="page-drop-down" id="pages" value={pageSige} onChange={this.onChangePageSize}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <IoSearchSharp className="query-search-icon" />
                                <input value={searchInput} className="query-search-input" type="search" id="query-search" placeholder="Search" onChange={this.onChangeQuerySearch} />
                            </div>
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
                    {isEmpty && (
                        <div className="print-container">
                            <div className="page-numbers-container">
                                <button className={`${currentPage === 0 ? "direction-btn-cursor-not-allowed" : "direction-btn"} ${currentPage !== 0 && "active-color"}`} onClick={() => this.onPageChange(0)} disabled={currentPage === 0}><MdKeyboardDoubleArrowLeft/></button>
                                <button className={`${currentPage === 0 ? "direction-btn-cursor-not-allowed" : "direction-btn"} ${currentPage !== 0 && "active-color"}`} onClick={() => this.onPageChange(currentPage - 1)} disabled={currentPage === 0}><MdKeyboardArrowLeft/></button>
                                {Array(pageCount).fill(null).map((page, index) => (
                                    <button className={`${currentPage === index ? "active-btn" : "default-btn"}`} key={index} onClick={() => this.onPageChange(index)}>{index + 1}</button>
                                ))}
                                <button className={`${currentPage === pageCount - 1 ? "direction-btn-cursor-not-allowed" : "direction-btn"} ${currentPage !== pageCount - 1 && "active-color"}`} onClick={() => this.onPageChange(currentPage + 1)} disabled={currentPage === pageCount - 1}><MdKeyboardArrowRight /></button>
                                <button className={`${currentPage === pageCount - 1 ? "direction-btn-cursor-not-allowed" : "direction-btn"} ${currentPage !== pageCount - 1 && "active-color"}`} onClick={() => this.onPageChange(pageCount - 1)} disabled={currentPage === pageCount - 1}><MdKeyboardDoubleArrowRight/></button>
                            </div>
                            <button type="button" className="query-reports-print-btn" onClick={this.onClickPrintQueryReports}>Print</button>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default AdminUserQueryReports