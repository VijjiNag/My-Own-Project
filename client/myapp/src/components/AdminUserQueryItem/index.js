import React from 'react'
import './index.css'

const AdminUserQueryItem = (props) => {
    const { userQuery } = props
    const { organizationName, correspondentName, email, contactNumber, address } = userQuery
    console.log(userQuery)
    return (
        <>
            <li className='user-query-list-item'>
                <p className='school-name-data'>{organizationName}</p>
                <p className='correspondent-name-data'>{correspondentName}</p>
                <p className='email-data'>{email}</p>
                <p className='contact-number-data'>{contactNumber}</p>
                <p className='address-data'>{address}</p>
            </li>
        </>
    )
}
export default AdminUserQueryItem