import React, {Fragment} from "react";
import { Outlet } from "react-router-dom";
import AdminHome from "../AdminHome";

const Auth = () => {
    return (
        <Fragment>
            <AdminHome/>
            <Outlet/>
        </Fragment>
    )
}

export default Auth