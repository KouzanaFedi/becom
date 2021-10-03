import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Grid, Paper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useQuery } from "@apollo/client";
import { EVENTS } from "../../../api/events";
import { useDispatch, useSelector } from "react-redux";
import { INIT_SELECTED_EVENT, RESET_CREATED_EVENT, scheduleEvents, scheduleHolidays, SET_EVENTS, SET_HOLIDAYS } from "../../../redux/logic/projectManager/scheduleSlice";
import AddEventDialog from "./AddEventDialog";
import { useRef, useState } from "react";
import DisplayEventDialog from "./DisplayEventDialog";
import ShareScheduleDialog from "./ShareScheduleDialog";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { clientsActiveProject } from '../../../redux/logic/projectManager/projectSlice';

const useStyles = makeStyles(() => ({
    container: {
        overflowY: 'auto',
        height: 'calc(100vh - 40px)',
        padding: '16px',
        width: '100vw',
        overflowX: 'auto',
        backgroundColor: '#EFE'
    },
    root: {
        padding: '16px'
    },
}));

const EventScheduler = () =>
{
    const classes = useStyles();

    const dispatch = useDispatch();
    const holidays = useSelector(scheduleHolidays);
    const events = useSelector(scheduleEvents);
    const project = useSelector(clientsActiveProject);
    console.log(project);

    const [openAddDial, setOpenAddDial] = useState(false);
    const [dateClicked, setDateClicked] = useState({ start: null, end: null });
    const [openDisplayDial, setOpenDisplayDial] = useState(false);
    const [openShareDial, setOpenShareDial] = useState(false);

    const calendar = useRef();

    // useEffect(() =>
    // {
    //     dispatch(INIT_CALENDAR_REF({ ref: calendar }));
    // }, [calendar, dispatch]);

    useQuery(EVENTS, {
        onCompleted: ({ holidaysEvent, eventsByProjectId }) =>
        {
            dispatch(SET_HOLIDAYS({ holidays: holidaysEvent }));
            dispatch(SET_EVENTS({ events: eventsByProjectId }))
        }, variables: {
            projectId: project.id
        }
    });

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper elevation={2} className={classes.root}>
                    <FullCalendar
                        ref={calendar}
                        selectable={true}
                        plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                        initialView="dayGridMonth"
                        themeSystem='bootstrap'
                        aspectRatio={5 / 3.5}
                        customButtons={{
                            share: {
                                text: 'share',
                                click: (event, _) =>
                                {
                                    setOpenShareDial(true);
                                }
                            }
                        }}
                        headerToolbar={{
                            start: 'prev,next today',
                            center: 'title',
                            end: 'share'
                        }}
                        events={[
                            ...holidays,
                            ...events
                        ]}
                        eventClick={({ event }) =>
                        {
                            const { startStr, title, extendedProps } = event;
                            const { id, startTime } = extendedProps;
                            dispatch(INIT_SELECTED_EVENT({ day: startStr, title, id, time: startTime }));
                            setOpenDisplayDial(true);
                        }}
                        select={(value) =>
                        {
                            setDateClicked({ start: new Date(value.start).getTime(), end: new Date(value.end).getTime() });
                            setOpenAddDial(true);
                        }}
                    />

                    <AddEventDialog
                        open={openAddDial}
                        dateClicked={dateClicked}
                        onClose={() =>
                        {
                            dispatch(RESET_CREATED_EVENT());
                            setOpenAddDial(false);
                            calendar.current.getApi().unselect();
                        }} />

                    <DisplayEventDialog
                        open={openDisplayDial}
                        onClose={() =>
                        {
                            // dispatch(RESET_SELECTED_EVENT());
                            setDateClicked(null);
                            setOpenDisplayDial(false);
                        }} />

                    <ShareScheduleDialog
                        open={openShareDial}
                        onClose={() =>
                        {
                            setOpenShareDial(false);
                        }} />
                </Paper>
            </Grid>

        </Grid >
    )
}

export default EventScheduler;