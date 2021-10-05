import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box, CircularProgress, IconButton } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { GET_NOTES_BY_EVENT_ID, NEW_NOTES_SUBSCRIPTION, SEND_NOTE } from "../../api/events";
import { Send } from '@material-ui/icons'
import { useState, useRef, useEffect } from "react";
import ThemedTextField from "../themedComponents/ThemedTextField";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '5px'
    },
    noNotes: {
        display: 'block',
        width: '75%',
        padding: '5px'
    },
    notes: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
    },
    sender: {
        alignSelf: 'flex-end',
        maxWidth: '75%',
        backgroundColor: '#d6d6d6',
        padding: '4px 10px',
        borderRadius: '20px',
        margin: '4px',
        fontSize: '12px',
        textAlign: 'start'
    },
    reciever: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
        backgroundColor: 'rgba(123, 33, 125, 1)',
        padding: '4px 10px',
        borderRadius: '20px',
        margin: '4px',
        color: 'white',
        fontSize: '12px',
        textAlign: 'start'
    },
    notesOutput: {
        width: ' 100%',
        maxHeight: '300px',
        height: 'auto',
        overflowY: 'auto',
    },
    notesInput: {
        height: '20%',
        marginTop: '15px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}));

const Notes = ({ id, senderType, initEventNotes, pushNewNote }) =>
{
    const classes = useStyles();
    const [notes, setNotes] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const messegesDiv = useRef(null);

    useEffect(() =>
    {
        console.log(notes);
        messegesDiv.current.scrollTop = messegesDiv.current.scrollHeight - messegesDiv.current.clientHeight;
    }, [notes]);


    useQuery(GET_NOTES_BY_EVENT_ID, {
        variables: { id },
        onCompleted: ({ eventNotes }) =>
        {
            initEventNotes(id, eventNotes)
            setNotes(eventNotes);
        }
    });

    function submitMsg({ msg })
    {
        sendNote({
            variables: {
                id,
                note: {
                    message: msg,
                    senderType: senderType,
                    sender: "sender",
                    recieverType: (senderType === 'agence') ? 'client' : 'agence',
                    reciever: "reciever",
                },
            },
        });
    }

    const [sendNote, { loading }] = useMutation(SEND_NOTE,
        {
            onCompleted: ({ sendNotes }) =>
            {
                pushNewNote(id, sendNotes);
                setNotes([...notes, sendNotes]);
                reset();
            }
        });

    useSubscription(NEW_NOTES_SUBSCRIPTION, {
        variables: {
            eventId: id,
            listenerType: senderType
        }, onSubscriptionData: ({ subscriptionData }) =>
        {
            const { data } = subscriptionData;
            const { noteSend } = data;
            pushNewNote(id, noteSend);
            setNotes([...notes, noteSend]);
        }
    });

    return <Box className={classes.root}>
        <Box className={classes.notesOutput} ref={messegesDiv}>
            {(notes.length === 0) ?
                <Box className={classes.noNotes}>
                    There is no notes left for this event.
                </Box> :
                < Box className={classes.notes}>
                    {notes.map((note) =>
                    {
                        if (note.senderType === senderType) return <Box className={classes.sender} key={note.id}>
                            {note.message}
                        </Box>
                        else return <Box className={classes.reciever} key={note.id}>
                            {note.message}
                        </Box>
                    })}
                </Box>
            }
        </Box>
        <form
            id="messageInput"
            onSubmit={handleSubmit(submitMsg)}
            className={classes.notesInput}>
            <ThemedTextField
                backgroundColor="#EFE"
                autoComplete='off'
                fullWidth
                inputProps={register('msg', { minLength: 3, required: true })}
            />
            {!loading ?
                <IconButton size="small"
                    type="submit"
                    form="messageInput"
                >
                    <Send htmlColor="#0080FF" />
                </IconButton > :
                <CircularProgress />
            }
        </form>
    </Box >
}

export default Notes;