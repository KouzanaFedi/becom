import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { EVENTS } from "../../../api/events";
import { useDispatch, useSelector } from "react-redux";
import { INIT_SELECTED_EVENT, RESET_CREATED_EVENT, RESET_SELECTED_EVENT, scheduleEvents, scheduleHolidays, SET_CREATED_DATE, SET_EVENTS, SET_HOLIDAYS } from "../../../redux/logic/projectManager/scheduleSlice";
import AddEventDialog from "./AddEventDialog";
import { useRef, useState } from "react";
import moment from "moment";
import DisplayEventDialog from "./DisplayEventDialog";
import ShareScheduleDialog from "./ShareScheduleDialog";
import bootstrapPlugin from '@fullcalendar/bootstrap';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    }
}));

const EventScheduler = () =>
{
    const classes = useStyles();

    const dispatch = useDispatch();
    const holidays = useSelector(scheduleHolidays);
    const events = useSelector(scheduleEvents);

    const [openAddDial, setOpenAddDial] = useState(false);
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
            projectId: "607d496a031c940568bab463"
        }
    });

    return (
        <Grid container className={classes.container}>
            <Grid item xs={9}>
                <Paper elevation={2}>
                    <Box p={4}>
                        <FullCalendar
                            className={classes.root}
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
                            select={({ _, startStr }) =>
                            {
                                const time = new moment().format('HH:mm');
                                dispatch(SET_CREATED_DATE({ day: startStr, time }));
                                setOpenAddDial(true);
                            }}
                        />

                        <AddEventDialog
                            open={openAddDial}
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
                                dispatch(RESET_SELECTED_EVENT());
                                setOpenDisplayDial(false);
                            }} />

                        <ShareScheduleDialog
                            open={openShareDial}
                            onClose={() =>
                            {
                                setOpenShareDial(false);
                            }} />
                    </Box>
                </Paper>
            </Grid>

        </Grid >
    )
}

export default EventScheduler;