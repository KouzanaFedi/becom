import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router";
import { TOKEN_VERIFY } from "../api/auth";
import { INIT_USER_DATA, userDataInit, userID } from "../redux/logic/userSlice";
import { AUTH_TOKEN } from "../utils/constants";
import SplashScreen from "../pages/SplashScreen"
import { getProjectListsByClient } from "../api/project";
import { INIT_CLIENTS_PROJECT } from "../redux/logic/projectManager/projectSlice";

const AuthProtectedRoute = ({ component, path }) =>
{
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = localStorage.getItem(AUTH_TOKEN);
    const userInit = useSelector(userDataInit);
    const userId = useSelector(userID);

    const [projectsInit] = useLazyQuery(getProjectListsByClient, {
        onCompleted: ({ getProjectsByClient}) =>
        {
            if (getProjectsByClient.length > 0) {
                dispatch(INIT_CLIENTS_PROJECT({ active: getProjectsByClient[0], list: getProjectsByClient }))
            }
        }
    });

    const [userDataInitQuery] = useLazyQuery(TOKEN_VERIFY, {
        variables: { token: isAuth },
        onCompleted: ({ verifyToken }) =>
        {
            dispatch(INIT_USER_DATA(verifyToken));
            projectsInit({
                variables: { client: verifyToken.id }
            });
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
            else {
                console.log("init proj");
                projectsInit({
                    variables: { client: userId }
                });
            }
        } else {
            history.replace("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, userInit]);

    return (isAuth ?
        (userInit ? <Route exact path={path} component={component} /> : <SplashScreen />) :
        <Redirect to='/login' />);
}

export default AuthProtectedRoute;