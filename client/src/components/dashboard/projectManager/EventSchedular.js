import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Grid, Paper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useLazyQuery } from "@apollo/client";
import { EVENTS } from "../../../api/events";
import { useDispatch, useSelector } from "react-redux";
import { INIT_SELECTED_EVENT, RESET_CREATED_EVENT, scheduleEvents, scheduleHolidays, SET_EVENTS, SET_HOLIDAYS } from "../../../redux/logic/projectManager/scheduleSlice";
import AddEventDialog from "./AddEventDialog";
import { useEffect, useRef, useState } from "react";
import DisplayEvent from "./DisplayEvent";
import ShareScheduleDialog from "./ShareScheduleDialog";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { clientsActiveProject } from '../../../redux/logic/projectManager/projectSlice';
import DetailDialog from "../../projects/tasks/DetailDialog";
import ThemedBackDrop from "../../themedComponents/ThemedBackDrop";

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
        padding: '16px',
        '& .btn-primary': {
            color: ' rgb(123, 33, 125)',
            border: ' 1px solid rgb(123, 33, 125)',
            height: '40px',
            padding: '10px 22px',
            fontSize: ' 14px',
            boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
            fontWeight: 700,
            borderRadius: '5px',
            textTransform: 'capitalize',
            backgroundColor: 'rgba(123, 33, 125, 0.3)'
        },
        '& .btn-primary:disabled': {
            boxShadow: 'unset !important'
        },
        '& .fc-next-button': {
            padding: '10px 15px',
        },
        '& .fc-prev-button': {
            padding: '10px 15px',
        },
        '& .fc .fc-toolbar-title': {
            fontWeight: 600
        },
        '& table, th, td ': {
            borderColor: 'rgba(123, 33, 125)'
        },
        '& table': {
            backgroundColor: 'rgba(123, 33, 125, 0.04)',
            borderRadius: '5px'
        },
        '& .fc-theme-bootstrap a:not([href])': {
            color: 'rgb(123, 33, 125)'
        },
        '& .fc-direction-ltr .fc-daygrid-event.fc-event-end': {
            marginRight: 'unset',
            borderRadius: 'unset'
        },
        '& .fc-direction-ltr .fc-daygrid-event.fc-event-start': {
            marginLeft: 'unset'
        },
        '& .fc-event-title': {
            padding: '2px 4px'
        },
        '& .fc-daygrid-event-harness': {
            cursor: 'pointer'
        }
    },
}));

const EventScheduler = () =>
{
    const classes = useStyles();

    const dispatch = useDispatch();
    const holidays = useSelector(scheduleHolidays);
    const events = useSelector(scheduleEvents);
    const project = useSelector(clientsActiveProject);

    const [openAddDial, setOpenAddDial] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventID, setSelectedEventID] = useState(null);
    const [dateClicked, setDateClicked] = useState({ start: null, end: null });
    const [openDisplayDial, setOpenDisplayDial] = useState(false);
    const [openShareDial, setOpenShareDial] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);

    const calendar = useRef();

    useEffect(() =>
    {
        if (project) {
            getEventQuery({
                variables: {
                    projectId: project.id
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project]);

    useEffect(() =>
    {
        if (selectedEventID) {
            setSelectedEvent(events.find((event) => event.extendedProps.id === selectedEventID));
        }
    }, [events, selectedEventID]);

    const [getEventQuery] = useLazyQuery(EVENTS, {
        onCompleted: ({ holidaysEvent, eventsByProjectId }) =>
        {
            dispatch(SET_HOLIDAYS({ holidays: holidaysEvent }));
            dispatch(SET_EVENTS({ events: eventsByProjectId }))
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
                        aspectRatio={(window.innerWidth - 64) / (window.innerHeight - 169)}
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
                            const { extendedProps: { id } } = event;
                            setSelectedEventID(id);
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
                            setOpenAddDial(false);
                            calendar.current.getApi().unselect();
                        }} />

                    <DetailDialog
                        open={openDisplayDial}
                        onClose={() =>
                        {
                            setDateClicked(null);
                            setOpenDisplayDial(false);
                        }} >
                        <DisplayEvent
                            project={project}
                            onClose={() =>
                            {
                                setDateClicked(null);
                                setOpenDisplayDial(false);
                            }}
                            selectedEventData={selectedEvent}
                            openBackDropOpen={() => setBackDropOpen(true)}
                            closeBackDropOpen={() => setBackDropOpen(false)}
                        />
                    </DetailDialog>

                    <ShareScheduleDialog
                        open={openShareDial}
                        onClose={() =>
                        {
                            setOpenShareDial(false);
                        }} />
                </Paper>
                <ThemedBackDrop backDropOpen={backDropOpen} />
            </Grid>
        </Grid >
    )
}

export default EventScheduler;