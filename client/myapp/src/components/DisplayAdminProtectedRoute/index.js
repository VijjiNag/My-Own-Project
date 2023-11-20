import React, {useState, useEffect, Fragment} from "react";
import { Outlet } from "react-router-dom";
import Cookie from 'js-cookie'
import AdminHome from "../AdminHome";

const DisplayAdminProtectedRoute = () => {
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
            {isLoggedIn && <AdminHome/>}
            <Outlet/>
        </Fragment>
    )
}

export default DisplayAdminProtectedRoute