import React, {Component, useState} from "react";
import AdminHeader from "../AdminHeader";
import './index.css'

const AdminHome = () => {
    const [imageurl, setimageurl] = useState("");
const filebrowsehandler = (event) => {
        let value = URL.createObjectURL(event.target.files[0]);
        setimageurl(value);
        console.log(imageurl)
    };
        return (
            <>
                <AdminHeader/>
                <h1>Home</h1>
                <input type="file" id="image"  onChange={filebrowsehandler}/>
                <img className="images" src={imageurl}/>
            </>
        )
}


...

interface UserParams {
  id: string
}

const UserPage = () => {
  const { id } = useParams<keyof UserParams>() as UserParams
  ...
}

export default AdminHome