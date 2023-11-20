import React, {useState, useEffect, Fragment} from "react";
import { Outlet } from "react-router-dom";
import Cookie from 'js-cookie'
import ChangePassword from "../ChangePassword";

const DisplayChangePasswordProtectedRoute = () => {
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
            {isLoggedIn && <ChangePassword/>}
            <Outlet/>
        </Fragment>
    )
}

export default DisplayChangePasswordProtectedRoute