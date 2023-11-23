import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ auth }) => {
        const jwtToken = Cookies.get("jwt_token")
        auth = jwtToken !== undefined
        return (auth === true ? <Outlet /> : <Navigate to="/" />)
}

export default ProtectedRoute