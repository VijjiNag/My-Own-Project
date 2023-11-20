import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'

const ProtectedRoute = (props) => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const checkUserToken = () => {
        const jwtToken = Cookie.get("jwt_token")
        if (!jwtToken || jwtToken === undefined) {
            setIsLoggedIn(false)
            return navigate('/')
        }
        setIsLoggedIn(true)
    }

    useEffect(() => {
        checkUserToken()
    }, [isLoggedIn])
    return (
        <Fragment>
            {isLoggedIn ? props.children : null}
        </Fragment>
    )
}

export default ProtectedRoute