import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { Box, CircularProgress, IconButton } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { GET_NOTES_BY_EVENT_ID, NEW_NOTES_SUBSCRIPTION, SEND_NOTE } from "../../api/events";
import { Send } from '@material-ui/icons'
import { useState, useRef, useEffect } from "react";
import ThemedTextField from "../themedComponents/ThemedTextField";
import { useForm } from "react-hook-form";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '5px',
        paddingBottom: '10px'
    },
    noNotes: {
        display: 'block',
        fontSize: "0.75em",
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
        padding: '4px 6px',
        borderRadius: '5px',
        margin: '4px',
        color: 'black',
        fontSize: '0.75em',
        textAlign: 'start'
    },
    reciever: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
        backgroundColor: 'rgba(123, 33, 125, 0.8)',
        padding: '4px 6px',
        borderRadius: '5px',
        margin: '4px',
        color: 'white',
        fontSize: '0.75em',
        textAlign: 'start'
    },
    notesOutput: {
        width: ' 100%',
        maxHeight: '300px',
        height: 'auto',
        overflowY: 'auto',
    },
    senderInfo: {
        alignSelf: 'flex-end',
        marginRight: '4px',
        fontSize: '0.65em',
        textAlign: 'start'
    },
    receiverInfo: {
        alignSelf: 'flex-start',
        marginLeft: '4px',
        fontSize: '0.65em',
        textAlign: 'start'
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

const Notes = ({ id, senderType, initEventNotes, pushNewNote, senderName }) =>
{
    const classes = useStyles();
    const [notes, setNotes] = useState([]);

    const { register, handleSubmit, reset } = useForm();
    const messegesDiv = useRef(null);

    useEffect(() =>
    {
        messegesDiv.current.scrollTop = messegesDiv.current.scrollHeight - messegesDiv.current.clientHeight;
    }, [notes]);


    const [getNotesQuery] = useLazyQuery(GET_NOTES_BY_EVENT_ID, {
        variables: { id },
        onCompleted: ({ eventNotes }) =>
        {
            initEventNotes(id, eventNotes)
            setNotes(eventNotes);
        }
    });

    useEffect(() =>
    {
        if (typeof initEventNotes === 'function') {
            getNotesQuery();
        } else {
            setNotes(initEventNotes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initEventNotes])

    function submitMsg({ msg })
    {
        sendNote({
            variables: {
                id,
                note: {
                    message: msg,
                    senderType: senderType,
                    sender: senderName,
                    recieverType: (senderType === 'agence') ? 'client' : 'agence',
                    reciever: (senderType === 'agence') ? 'client' : 'agence',
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
                        (note.senderType === senderType) ?
                            <Box display="flex" flexDirection="column" key={note._id}>
                                <div className={classes.sender}>
                                    {note.message}
                                </div>
                                <div className={classes.senderInfo}>
                                    {new moment(new Date(parseInt(note.createdAt))).format('MMM D, LT')}
                                </div>
                            </Box>
                            : <Box display="flex" flexDirection="column" key={note._id}>
                                <div className={classes.reciever}>
                                    {note.message}
                                </div>
                                <div className={classes.receiverInfo}>
                                    send by {note.sender} {new moment(new Date(parseInt(note.createdAt))).format('MMM D, LT')}
                                </div>
                            </Box>
                    )}
                </Box>
            }
        </Box>
        <form
            id={"messageInput" + id}
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
                    form={"messageInput" + id}
                >
                    <Send htmlColor="#0080FF" />
                </IconButton > :
                <CircularProgress />
            }
        </form>
    </Box >
}

export default Notes;