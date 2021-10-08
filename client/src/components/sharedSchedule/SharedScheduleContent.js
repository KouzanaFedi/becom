import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { sharedScheduleUsers } from '../../redux/logic/projectManager/sharedScheduleSlice';
import ThemedBackDrop from '../themedComponents/ThemedBackDrop';
import EventsGroupList from './EventsGroupList';
import ScheduleUser from './ScheduleUser';

const useStyles = makeStyles(() => ({
    root: {
        width: "calc(100vw - 32px)",
        height: 'calc(100vh - 40px)',
        padding: "16px 16px 0",
        overflowY: "auto"
    },
    title: {
        fontSize: '28px',
        fontWeight: 700
    },
    events: {
        width: "100%",
        overflowY: 'hidden',
        paddingBottom: "16px"
    }
}));

const SharedScheduleContent = () =>
{
    const classes = useStyles();

    const scheduleUsers = useSelector(sharedScheduleUsers);
    const [backDropOpen, setBackDropOpen] = useState(false);

    return <Grid
        justifyContent="center"
        container
        className={classes.root}
        rowGap="15px"
        alignContent="flex-start">
        <Grid item xs={12} >
            <ScheduleUser scheduleUsers={scheduleUsers} />
        </Grid>
        {scheduleUsers.selected &&
            <Grid container item xs={6} className={classes.events}>
                <EventsGroupList setBackDropOpen={(s) => setBackDropOpen(s)} />
            </Grid>}
        <ThemedBackDrop backDropOpen={backDropOpen} />
    </Grid >
}

export default SharedScheduleContent;