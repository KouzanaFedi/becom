import { useMutation } from "@apollo/client";
import { Paper, Grid, Box, Typography, } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { UPDATE_EVENT_STATE_STATUS } from "../../api/events";
import { DELETE_EVENT_FROM_LIST, PUSH_NEW_NOTE, sharedScheduleUsers } from "../../redux/logic/projectManager/sharedScheduleSlice";
import Notes from "./Notes";
import { IMAGE_ENDPOINT } from "../../config";
import ThemedButton from "../themedComponents/ThemedButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    coloredLine: {
        width: "7px",
        height: 'auto',
        background: `linear-gradient(120deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        borderRadius: "5px 0 0 5px",
    },
    title: {
        fontWeight: 600,
    },
    startDate: {
        fontSize: ".75em",
        color: "#B1B8C2",
        marginLeft: "10px"
    },
    description: {
        fontSize: ".85em",
        textAlign: "start",
        marginTop: "5px",
        wordBreak: 'break-all'
    },
    img: {
        width: "100%",
        height: '100%'
    },
    image: {
        maxHeight: '300px',
        height: 'auto',
        display: 'flex',
        maxWidth: 'inherit',
        width: 'auto',
        margin: "0 auto",
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "column"
    }
}));

const EventCardView = ({ data, setBackDropOpen, onOpenAnnotation, setImage, setAnnotations }) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(sharedScheduleUsers);

    const pushNewNote = (id, sendNotes) =>
    {
        dispatch(PUSH_NEW_NOTE({ id, note: sendNotes }));
    }

    const [updateState] = useMutation(UPDATE_EVENT_STATE_STATUS, {
        onCompleted: (_) =>
        {
            dispatch(DELETE_EVENT_FROM_LIST({ id: data._id }));
            setBackDropOpen(false);
        }
    });

    return <Paper elevation={3} >
        <Box display="flex">
            <div className={classes.coloredLine} />
            <Box p={1} className={classes.root}>
                <Grid container >
                    <Grid item xs={6} display="flex" flexDirection="column"
                        justifyItems="flex-start" alignItems="flex-start">
                        <Typography className={classes.title}>{data.title}</Typography>
                        <Typography className={classes.startDate}>{new moment(new Date(parseInt(data.start))).format('LLL')}</Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="flex-end" columnGap="20px">
                        <ThemedButton
                            variant="outlined"
                            buttonStyle={{ type: 'denied' }}
                            fullWidth={false}
                            onClick={(_) =>
                            {
                                setBackDropOpen(true);
                                updateState({ variables: { id: data._id, state: "denied" } });
                            }}
                        >
                            Decline
                        </ThemedButton>
                        <ThemedButton
                            variant="outlined"
                            buttonStyle={{ type: 'secondary' }}
                            fullWidth={false}
                            style={{
                                color: '#3CA374',
                                borderColor: '#3CA374',
                                fontWeight: 'bold',
                                backgroundColor: '#3CA37432',
                            }}
                            onClick={(_) =>
                            {
                                setBackDropOpen(true);
                                updateState({ variables: { id: data._id, state: "confirmed" } });
                            }}
                        >
                            Confirme
                        </ThemedButton>
                    </Grid>
                    <Grid className={classes.description} item xs={12}>
                        <Box my={2}>
                            {data.description}
                        </Box>
                    </Grid>
                    <Grid
                        item xs={6}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        rowGap="15px">
                        {data.image && <>
                            <Box className={classes.image}>
                                <img className={classes.img}
                                    src={`${IMAGE_ENDPOINT}${data.image?.src}`}
                                    alt="pic" />
                            </Box>
                            <Box>
                                <ThemedButton
                                    variant="outlined"
                                    buttonStyle={{ type: 'secondary' }}
                                    fullWidth={false}
                                    onClick={() =>
                                    {
                                        setImage({ ...data.image, idEvent: data._id });
                                        //setAnnotations(data.annotations);
                                        onOpenAnnotation();
                                    }}
                                >
                                    Annotate
                                </ThemedButton>
                            </Box>
                        </>}
                    </Grid>
                    <Grid item xs={6}>
                        <Notes
                            id={data._id}
                            senderType="client"
                            initEventNotes={data.notes}
                            pushNewNote={pushNewNote}
                            senderName={users.selected.name}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Paper >
}

export default EventCardView;

