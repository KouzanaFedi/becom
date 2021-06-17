import { useMutation } from "@apollo/client";
import { Card, CardActions, CardContent, CardHeader, Grid, Button, makeStyles, Box, CircularProgress } from "@material-ui/core"
import { useDispatch } from "react-redux";
import { UPDATE_EVENT_STATE_STATUS } from "../../api/events";
import { DELETE_EVENT_FROM_LIST, INIT_EVENT_NOTES, PUSH_NEW_NOTE } from "../../redux/logic/projectManager/sharedScheduleSlice";
import Notes from "./Notes";

const useStyles = makeStyles((theme) => ({
    actions: {
        justifyContent: 'space-between'
    },
    notesContainer: {
        height: '250px'
    }
}));

const EventCardView = ({ data }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const initEventNotes = (id, eventNotes) =>
    {
        dispatch(INIT_EVENT_NOTES({ id, notes: eventNotes }));
    }

    const pushNewNote = (id, sendNotes) =>
    {
        dispatch(PUSH_NEW_NOTE({ id, note: sendNotes }));
    }

    const [updateState, { loading }] = useMutation(UPDATE_EVENT_STATE_STATUS, {
        onCompleted: (_) =>
        {
            dispatch(DELETE_EVENT_FROM_LIST({ id: data.id }));
        }
    });

    return <Card elevation={3}>
        <CardHeader title={data.title} subheader={`Start date: ${data.start} ${data.startTime}`} />
        <CardContent >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Box display='flex' justifyContent='center' alignItems='center' className={classes.notesContainer}>
                        Content
                    </Box>
                </Grid>
                <Grid item xs={6} className={classes.notesContainer}>
                    <Notes id={data.id}
                        notes={data.notes}
                        senderType={'client'}
                        initEventNotes={initEventNotes}
                        pushNewNote={pushNewNote} />
                </Grid>
            </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
            <Button
                variant="contained"
                onClick={(_) =>
                {
                    updateState({ variables: { id: data.id, state: "denied" } });
                }}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                }}
            >
                {loading ? <CircularProgress
                    color="secondary"
                    size={24} /> : 'Decline'}
            </Button>
            <Button
                variant="contained"
                onClick={(_) =>
                {
                    updateState({ variables: { id: data.id, state: "confirmed" } });
                }}
                style={{
                    backgroundColor: 'green ',
                    color: 'white',
                }}
            >
                {loading ? <CircularProgress size={24}
                    color="secondary" /> : 'Confirme'}
            </Button>
        </CardActions>
    </Card >
}

export default EventCardView;