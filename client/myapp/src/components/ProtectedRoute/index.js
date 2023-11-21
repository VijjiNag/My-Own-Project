import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ auth }) => {
        const jwtToken = Cookies.get("jwt_token")
        auth = jwtToken !== undefined
        return (auth === true ? <Outlet /> : <Navigate to="/" />)
}

export default ProtectedRoute