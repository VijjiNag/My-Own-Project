import React, {Component} from "react";
import AdminHeader from "../AdminHeader";
import './index.css'

class AdminHome extends Component {
    render() {
        return (
            <div>
                <AdminHeader/>
                <h1>Home</h1>
            </div>
        )
    }
}

export default AdminHome