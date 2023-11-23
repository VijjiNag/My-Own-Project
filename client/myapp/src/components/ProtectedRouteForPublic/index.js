import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteForPublic = ({ auth }) => {
        const jwtToken = Cookies.get("jwt_token")
        auth = jwtToken !== undefined
        return (auth === true ? <Navigate to="/admin" /> : <Outlet />)
}

export default ProtectedRouteForPublic