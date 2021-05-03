import { Redirect, Route } from "react-router";
import { AUTH_TOKEN } from "../utils/constants";

const AuthProtectedRoute = (props) =>
{
    const Component = props.component;
    const isAuth = localStorage.getItem(AUTH_TOKEN);
    const path = props.path;

    return (isAuth ?
        <Route path={path} component={Component} /> :
        <Redirect to='/login' />);
}


export default AuthProtectedRoute;