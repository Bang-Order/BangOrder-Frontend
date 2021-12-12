import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { isLogin } from "./Auth";

const PrivateRoute = ({ component: Component, name: Name, index: Index, ...rest }) => {
    console.log(Index);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() ? <><Sidebar name={Name} index={Index}/> <Component {...props} /></> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;