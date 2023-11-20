import React, {useState, useEffect, Fragment} from "react";
import { Outlet } from "react-router-dom";
import Cookie from 'js-cookie'
import SchoolRegisterForm from "../SchoolRegisterForm";

const DisplaySchoolProtectedRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const checkUserToken = () => {
        const jwtToken = Cookie.get("jwt_token")
        if (!jwtToken || jwtToken === undefined) {
            setIsLoggedIn(false)
        }
        setIsLoggedIn(true)
    }

    useEffect(() => {
        checkUserToken()
    }, [isLoggedIn])
    return (
        <Fragment>
            {isLoggedIn && <SchoolRegisterForm/>}
            <Outlet/>
        </Fragment>
    )
}

export default DisplaySchoolProtectedRoute