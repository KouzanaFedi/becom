import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";
import { TOKEN_VERIFY } from "../api/auth";
import { INIT_USER_DATA, userDataInit } from "../redux/logic/userSlice";
import { AUTH_TOKEN } from "../utils/constants";
import SplashScreen from "../pages/SplashScreen"

const AuthProtectedRoute = ({ component, path }) =>
{
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = localStorage.getItem(AUTH_TOKEN);
    const userInit = useSelector(userDataInit);


    const [userDataInitQuery] = useLazyQuery(TOKEN_VERIFY, {
        variables: { token: isAuth },
        onCompleted: ({ verifyToken }) =>
        {
            dispatch(INIT_USER_DATA(verifyToken));
        },
        onError: (_) =>
        {
            localStorage.removeItem(AUTH_TOKEN);
            history.replace("/login");
        }
    });
    useEffect(() =>
    {
        if (isAuth !== null) {
            if (!userInit) {
                userDataInitQuery();
            }
        } else {
            history.replace("/login");
        }
    }, [isAuth, userInit, userDataInitQuery, history]);

    return (isAuth ?
        (userInit ? <Route exact path={path} component={component} /> : <SplashScreen />) :
        <Redirect to='/login' />);
}

export default AuthProtectedRoute;