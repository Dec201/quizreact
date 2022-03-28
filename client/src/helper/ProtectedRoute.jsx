import React, {useContext} from "react";
import {Outlet} from "react-router-dom";
import NotAuthenticated from "../commonPages/NotAuthenticated";
import {LoginContext} from "./Context";


function ProtectedRoute(){

    const {globalLoggedIn} = useContext(LoginContext);

    return globalLoggedIn === true ? <Outlet /> : <NotAuthenticated />
    
}

export default ProtectedRoute;