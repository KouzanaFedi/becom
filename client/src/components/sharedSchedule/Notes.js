import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box, CircularProgress, IconButton, makeStyles, TextField } from "@material-ui/core";
import { GET_NOTES_BY_EVENT_ID, NEW_NOTES_SUBSCRIPTION, SEND_NOTE } from "../../api/events";
import { Send } from '@material-ui/icons'
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '4px',
        border: '1px solid #d6d6d6',
        padding: '5px'
    },
    noNotes: {
        display: 'block',
        backgroundColor: 'rgba(123, 33, 125, .45)',
        borderRadius: '4px',
        border: '1.5px solid rgba(123, 33, 125, 1)',
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
        backgroundColor: 'rgba(123, 33, 125, 1)',
        padding: '4px 10px',
        borderRadius: '20px',
        margin: '4px',
        color: 'white',
        fontSize: '12px',
        textAlign: 'start'
    },
    reciever: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
        backgroundColor: '#d6d6d6',
        padding: '4px 10px',
        borderRadius: '20px',
        margin: '4px',
        fontSize: '12px',
        textAlign: 'start'
    },
    notesOutput: {
        height: '80%',
        width: '100%'
    },
    notesInput: {
        height: '20%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}));

const Notes = ({ id, notes, senderType, initEventNotes, pushNewNote }) =>
{
    const classes = useStyles();
    const [noteMsg, setNoteMsg] = useState('');

    useQuery(GET_NOTES_BY_EVENT_ID, {
        variables: { id },
        onCompleted: ({ eventNotes }) =>
        {
            initEventNotes(id, eventNotes)
        }
    });

    const [sendNote, { loading }] = useMutation(SEND_NOTE, {
        variables: {
            id,
            note: {
                message: noteMsg.trim(),
                senderType: senderType,
                sender: "sender",
                recieverType: (senderType === 'agence') ? 'client' : 'agence',
                reciever: "reciever",
            }
        }, onCompleted: ({ sendNotes }) =>
        {
            pushNewNote(id, sendNotes)
            setNoteMsg('');
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
            pushNewNote(id, noteSend)
        }
    });

    return <Box className={classes.root}>
        <Box className={classes.notesOutput}>
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
        <Box className={classes.notesInput}>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={noteMsg}
                onChange={(event) =>
                {
                    setNoteMsg(event.target.value);
                }}
            />
            {!loading ?
                <IconButton size="small"
                    onClick={(event) =>
                    {
                        const data = noteMsg.trim();
                        if (data.length > 0) {
                            sendNote();
                        }
                    }}>
                    <Send />
                </IconButton > :
                <CircularProgress />
            }
        </Box>
    </Box >
}

export default Notes;