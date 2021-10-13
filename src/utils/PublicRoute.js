import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./Auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() && restricted ? (
                    <Redirect to="/order-list" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;