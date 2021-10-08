import { useQuery } from "@apollo/client";
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { GET_SHARED_SCHEDULE_BY_TOKEN } from "../api/events";
import { INIT_SHARED_EVENTS, scheduleToken } from "../redux/logic/projectManager/sharedScheduleSlice";
import { useEffect } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import ThemedAppBar from "../components/themedComponents/ThemedAppBar";
import { useHistory } from "react-router";
import SplashScreen from "./SplashScreen"
import SharedScheduleContent from "../components/sharedSchedule/SharedScheduleContent";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden"
    }
}));

const SharedSchedule = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const scheduleTokenValid = useSelector(scheduleToken);

    useEffect(() =>
    {
    }, [scheduleTokenValid])

    const { token } = useParams();

    const { loading } = useQuery(GET_SHARED_SCHEDULE_BY_TOKEN, {
        variables: { token },
        onCompleted: ({ getSharedSchedule }) =>
        {
            dispatch(INIT_SHARED_EVENTS({ getSharedSchedule, token }));
        },
        onError: () =>
        {
            history.replace('/404');
        }
    });

    return <>
        {!loading ? <div className={classes.root}>
            <CssBaseline />
            <ThemedAppBar type='notmenu' name="Planning" />
            {scheduleTokenValid && <SharedScheduleContent />}
        </div >
            : < SplashScreen />}
    </>
}

export default SharedSchedule;