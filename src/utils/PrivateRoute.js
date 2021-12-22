import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { isLogin } from "./Auth";

const PrivateRoute = ({ component: Component, name: Name, index: Index, ...rest }) => {
    const [update, setUpdate] = useState(false);
    const handleUpdateSidebar = () => {
        setUpdate(!update);
    }
    console.log(update);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() ? <><Sidebar name={Name} index={Index} update={update}/> <Component {...props} handleUpdateSidebar={handleUpdateSidebar}/></> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;