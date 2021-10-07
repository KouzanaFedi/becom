import { useQuery } from "@apollo/client";
import { Box, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { GET_SHARED_SCHEDULE_BY_TOKEN } from "../api/events";
import EventCardView from "../components/sharedSchedule/EventCardView";
import { INIT_SHARED_EVENTS, SET_TOKEN_VALUE, sharedScheduleSharedEvents } from "../redux/logic/projectManager/sharedScheduleSlice";

const SharedSchedule = () =>
{
    console.log("tadaaa");
    const dispatch = useDispatch();

    const { token } = useParams();
    dispatch(SET_TOKEN_VALUE({ token }));

    const listOfEvents = useSelector(sharedScheduleSharedEvents)

    // const { loading } = 
    useQuery(GET_SHARED_SCHEDULE_BY_TOKEN, {
        variables: { token },
        onCompleted: ({ getSharedSchedule }) =>
        {
            dispatch(INIT_SHARED_EVENTS({ events: getSharedSchedule }));
        }
    });



    return <Box m={2}>
        <Grid container spacing={3}>
            {listOfEvents.map((event) =>
            {
                return <Grid item xs={6} key={event.id}>
                    <EventCardView data={event} />
                </Grid>
            })}
        </Grid>
    </Box>
}

export default SharedSchedule;