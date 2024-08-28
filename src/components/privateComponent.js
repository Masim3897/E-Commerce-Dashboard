import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    // ye line localstorage sa user get kr ka auth ma store krway gi
    const auth = localStorage.getItem('user');

    return auth ? <Outlet /> : <Navigate to="/signup" />
}
export default PrivateComponent

// privatecomponent ko hm navbar ko hide
//  krna ka liay use krta ha ka jb tk user
//  signup na kr la tb tk wo baki navbar par jana ki ijazat na da