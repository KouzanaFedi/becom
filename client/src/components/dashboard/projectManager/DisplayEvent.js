import { Box, Breadcrumbs, Grid, Typography, IconButton, } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import
{
    DELETE_EVENT_STATE, UPDATE_EVENT_STATE,
    ADD_IMAGE_FROM_EVENT_UPDATE, INIT_SELECTED_EVENT_NOTES, PUSH_NEW_NOTE_SELECTED_EVENT, DELETE_IMAGE_FROM_EVENT_UPDATE
} from "../../../redux/logic/projectManager/scheduleSlice";
import { Edit, Close } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { ADD_IMAGE_TO_EVENT, DELETE_EVENT, DELETE_IMAGE_FROM_EVENT, UPDATE_EVENT } from "../../../api/events";
import Notes from "../../sharedSchedule/Notes";
import ThemedTextField from "../../themedComponents/ThemedTextField";
import ThemedButton from "../../themedComponents/ThemedButton";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@material-ui/lab";
import { parseTimeTimePicker } from "../../../utils/timeParser";
import { IMAGE_ENDPOINT } from "../../../config";
import { userData } from "../../../redux/logic/userSlice";
import Annotation from 'react-image-annotation';

const useStyles = makeStyles((theme) => ({
    actions: {
        justifyContent: "space-between"
    },
    header: {
        width: "100%",
    },
    notes: {
        height: '250px'
    },
    title: {
        color: '#000',
        fontWeight: 700,
        fontSize: '18px'
    },
    bottomMargin: {
        marginBottom: '16px'
    },
    label: {
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.54)',
    },
    invisible: {
        display: 'none'
    },
    imageName: {
        wordBreak: 'break-all',
        fontSize: "14px",
        marginLeft: '5px',
        marginBottom: '5px'
    },
    status: ({ statusColor }) => ({
        fontWeight: 700,
        display: "inline-flex",
        alignItems: 'center',
        '&::before': {
            marginRight: '5px',
            content: '""',
            width: "10px",
            height: "10px",
            borderRadius: "100%",
            backgroundColor: statusColor
        }
    }),
    statusHeight: {
        height: '56px'
    },
    imageHeight: {
        height: "100%",
        width: "100%",
    },
    image: {
        maxHeight: '350px',
        height: 'auto',
        display: 'flex',
        maxWidth: 'calc((60vw / 2) - 32px)',
        width: 'auto',
        margin: "0 auto"
    },
    content: {
        height: "calc(100vh - 144px)",
        overflowY: "auto",
    }
}));

function statusColor(status)
{
    const colorPalette = { pending: '#8c8c8c', confirmed: 'green', denied: 'red' };
    return colorPalette[status];
}

const DisplayEvent = ({ project, selectedEventData, openBackDropOpen, closeBackDropOpen, onClose }) =>
{
    const classes = useStyles({ statusColor: statusColor(selectedEventData.extendedProps.eventState) });
    const dispatch = useDispatch();

    const [annotations, setAnnotations] = useState([]);
    const [activeAnnotations, setActiveAnnotations] = useState([]);

    useEffect(() =>
    {
        console.log(selectedEventData.extendedProps.annotations);
        setAnnotations(selectedEventData.extendedProps.annotations.reduce((accum, occu) =>
        {
            const tmp = [...accum];
            tmp.push({
                data: {
                    id: occu._id,
                    text: occu.text,
                },
                geometry: {
                    type: occu.type,
                    x: parseFloat(occu.x),
                    y: parseFloat(occu.y),
                    width: parseFloat(occu.width),
                    height: parseFloat(occu.height)
                }
            });
            return tmp;
        }, []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEventData]);

    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        defaultValues: {
            title: selectedEventData.title,
            description: selectedEventData.extendedProps.description
        }
    });

    const [updateEventQuery] = useMutation(UPDATE_EVENT, {
        onCompleted: ({ updateEvent }) =>
        {
            dispatch(UPDATE_EVENT_STATE({
                event: updateEvent
            }));
            setIsEditMode(false);
            closeBackDropOpen();
        }
    });

    function submit({ title, description })
    {
        openBackDropOpen();
        updateEventQuery({
            variables: {
                id: selectedEventData.extendedProps.id,
                title,
                description,
                start: `${time.start}`,
                end: `${time.end}`,
            }
        })
    }

    const [time, setTime] = useState({ start: selectedEventData.start, end: selectedEventData.extendedProps.end });

    const [isEditMode, setIsEditMode] = useState(false);
    const user = useSelector(userData);

    const initEventNotes = (id, eventNotes) =>
    {
        dispatch(INIT_SELECTED_EVENT_NOTES({ notes: eventNotes, id }));
    }
    const pushNewNote = (id, sendNotes) =>
    {
        dispatch(PUSH_NEW_NOTE_SELECTED_EVENT({ note: sendNotes, id }));
    }


    const [deleteImageQuery] = useMutation(DELETE_IMAGE_FROM_EVENT, {
        onCompleted: () =>
        {
            dispatch(DELETE_IMAGE_FROM_EVENT_UPDATE({ id: selectedEventData.extendedProps.id }));
            closeBackDropOpen();
        }
    });

    const [addImageQuery] = useMutation(ADD_IMAGE_TO_EVENT, {
        onCompleted: ({ addImageToEvent }) =>
        {
            dispatch(ADD_IMAGE_FROM_EVENT_UPDATE({ image: addImageToEvent, id: selectedEventData.extendedProps.id }));
            closeBackDropOpen();
        }
    });

    const [deleteEventQuery] = useMutation(DELETE_EVENT, {
        onCompleted: ({ deleteEvent }) =>
        {
            closeBackDropOpen();
            onClose();
            setTimeout(() =>
            {
                dispatch(DELETE_EVENT_STATE({ id: deleteEvent.id }));
            }, 200);
        }
    });

    return (
        <Grid container >
            <Grid item xs={12} >
                <Box p={2} className={classes.header} display="flex" justifyContent="space-between" alignItems="center">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Typography >{project.title} </Typography>
                        <Typography className={classes.title}> {selectedEventData.title} </Typography>
                    </Breadcrumbs>
                    {!isEditMode ?
                        <ThemedButton
                            fullWidth={false}
                            buttonStyle={{ type: 'primary' }}
                            variant="outlined"
                            endIcon={<Edit />}
                            onClick={() => { setIsEditMode(true) }}
                        >
                            Edit
                        </ThemedButton> : <ThemedButton
                            fullWidth={false}
                            buttonStyle={{ type: 'denied' }}
                            variant="outlined"
                            startIcon={<Close />}
                            onClick={() =>
                            {
                                setIsEditMode(false);
                                reset();
                                setTime({ start: selectedEventData.start, end: selectedEventData.extendedProps.end });
                            }}
                        >
                            Cancel
                        </ThemedButton>}
                </Box>
            </Grid>
            <Box className={classes.content}>
                <Grid item container xs={12} display="flex">
                    <Grid item xs={5}>
                        <form id="updateEventForm" onSubmit={handleSubmit(submit)}>
                            <Box p={2}>
                                <ThemedTextField
                                    inputProps={register('title', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                                    label="Title"
                                    className={classes.bottomMargin}
                                    backgroundColor={isEditMode ? '#EfE' : "inherit"}
                                    disabled={!isEditMode}
                                    error={errors?.title !== undefined}
                                    helperText={errors?.title !== undefined && errors.title.message}
                                    fullWidth
                                />
                                <ThemedTextField
                                    inputProps={register('description', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                                    backgroundColor={isEditMode ? '#EfE' : "inherit"}
                                    fullWidth
                                    className={classes.bottomMargin}
                                    multiline
                                    disabled={!isEditMode}
                                    label="Description"
                                    rows={4}
                                    maxRows={6}
                                    error={errors?.description !== undefined}
                                    helperText={errors?.description !== undefined && errors.description.message}
                                />
                            </Box>
                        </form>
                        <Box p={2} pl={4}>
                            <Grid item container xs={12} display="flex" alignItems="center" rowGap="15px">
                                <Grid item xs={3}>
                                    <Typography className={classes.label} >Start</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <DateTimePicker
                                        inputFormat="MM/DD/yyyy HH:mm"
                                        id="date"
                                        ampm={false}
                                        disabled={!isEditMode}
                                        value={parseTimeTimePicker(new Date(time?.start).getTime())}
                                        renderInput={(props) => <ThemedTextField
                                            label="start"
                                            backgroundColor={isEditMode ? '#EfE' : "inherit"}
                                            {...props} />}
                                        onChange={(value) =>
                                        {
                                            setTime({ ...time, start: new Date(value).getTime() });
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={classes.label} >End</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <DateTimePicker
                                        inputFormat="MM/DD/yyyy HH:mm"
                                        id="date"
                                        disabled={!isEditMode}
                                        ampm={false}
                                        value={parseTimeTimePicker(new Date(time?.end).getTime())}
                                        renderInput={(props) => <ThemedTextField
                                            label="start"
                                            backgroundColor={isEditMode ? '#EfE' : "inherit"}
                                            {...props} />}
                                        onChange={(value) =>
                                        {
                                            setTime({ ...time, end: new Date(value).getTime() });
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={classes.label} >Image</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <label htmlFor="contained-button-file">
                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            className={classes.invisible}
                                            type="file"
                                            onChange={(event) =>
                                            {
                                                openBackDropOpen();
                                                addImageQuery({
                                                    variables: {
                                                        id: selectedEventData.extendedProps.id,
                                                        addedBy: user.id,
                                                        file: event.target.files[0],
                                                        projectTitle: project.title
                                                    }
                                                })
                                            }} />
                                        <ThemedButton
                                            variant="outlined"
                                            buttonStyle={{ type: 'primary' }}
                                            component="span">
                                            Upload
                                        </ThemedButton>
                                    </label>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className={classes.imageName}>
                                        {selectedEventData.extendedProps.image ?
                                            <IconButton
                                                onClick={() =>
                                                {
                                                    openBackDropOpen();
                                                    deleteImageQuery({
                                                        variables:
                                                            { id: selectedEventData.extendedProps.id }
                                                    })
                                                }}
                                                size="small">
                                                <Close />
                                            </IconButton> :
                                            <div className={classes.imageName}>No image selected.</div>
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item container xs={7} display="flex">
                        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-start">
                            <Box p={2} className={classes.statusHeight}>
                                <Typography className={classes.status}>{selectedEventData.extendedProps.eventState}</Typography>
                            </Box>
                        </Grid>
                        {selectedEventData.extendedProps.image &&
                            <Grid item xs={12} className={classes.imageHeight}>
                                <Annotation
                                    src={`${IMAGE_ENDPOINT}${selectedEventData.extendedProps.image?.src}`}
                                    className={classes.image}
                                    alt='Image to annote'
                                    annotations={annotations}
                                    disableAnnotation={true}
                                    disableEditor={true}
                                    disableSelector={true}
                                    activeAnnotations={activeAnnotations}
                                />
                                {/* <img className={classes.image} src={`${IMAGE_ENDPOINT}${selectedEventData.extendedProps.image?.src}`} alt="pic" /> */}
                            </Grid>}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box p={2}>
                        <Notes
                            id={selectedEventData.extendedProps.id}
                            senderType={'agence'}
                            senderName={user.name}
                            initEventNotes={initEventNotes}
                            pushNewNote={pushNewNote} />
                    </Box>
                </Grid>
            </Box>
            <Box p={2}>
                <Grid item xs={12} display="flex" justifyContent="space-between">
                    <ThemedButton
                        variant="outlined"
                        buttonStyle={{ type: 'denied' }}
                        onClick={() =>
                        {
                            openBackDropOpen();
                            deleteEventQuery({
                                variables: {
                                    id: selectedEventData.extendedProps.id
                                },
                            });
                        }}
                        fullWidth={false}
                    >
                        Delete
                    </ThemedButton>
                    <Box display="flex" columnGap="15px">
                        <div />
                        {isEditMode &&
                            <ThemedButton
                                variant="outlined"
                                buttonStyle={{ type: 'primary' }}
                                type="submit"
                                form="updateEventForm"
                                fullWidth={false}
                            >
                                Submit
                            </ThemedButton>}
                    </Box>
                </Grid>
            </Box>
        </Grid >
    );
}

export default DisplayEvent;