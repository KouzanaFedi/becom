import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_EVENT_STATE, RESET_UPDATED_EVENT, scheduleSelectedEvent, UPDATE_EVENT_STATE, UPDATE_SELECTED_DATE, UPDATE_SELECTED_TITLE } from "../../../redux/logic/projectManager/scheduleSlice";
import { Schedule, Edit, Close } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT, UPDATE_EVENT } from "../../../api/events";

const useStyles = makeStyles((theme) => ({
    actions: {
        justifyContent: "space-between"
    }
}));
const DisplayEventDialog = ({ open, onClose }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const selectedEvent = useSelector(scheduleSelectedEvent);

    const [updateEventQuery, { loading: loadingUpdate }] = useMutation(UPDATE_EVENT, {
        variables: {
            id: selectedEvent.id,
            title: selectedEvent.title.value,
            start: `${selectedEvent.day} ${selectedEvent.time}`
        }, onCompleted: ({ updateEvent }) =>
        {
            dispatch(UPDATE_EVENT_STATE({
                id: updateEvent.id,
                title: updateEvent.title,
                start: updateEvent.start,
                statTime: updateEvent.startTime
            }));
        }
    });

    const [deleteEventQuery, { loading: loadingDelete }] = useMutation(DELETE_EVENT, {
        variables: {
            id: selectedEvent.id
        },
        onCompleted: ({ deleteEvent }) =>
        {
            dispatch(DELETE_EVENT_STATE({ id: deleteEvent.id }));
        }
    });

    return <Dialog maxWidth='md' fullWidth open={open} onEscapeKeyDown={onClose}>
        <Box p={2} >
            <DialogTitle style={{ paddingTop: 0, paddingRight: 0 }} >
                <Box display="flex" alignItems="center" justifyContent='space-between'>
                    <Box >Event Display {selectedEvent.id}</Box>
                    <Box>
                        {!isEditMode ? < IconButton onClick={() => { setIsEditMode(true) }}>
                            <Edit />
                        </IconButton> : < IconButton onClick={() =>
                        {
                            setIsEditMode(false);
                            dispatch(RESET_UPDATED_EVENT());
                        }}>
                            <Close />
                        </IconButton>}
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container justify="space-between" >
                    <Grid item xs={3}>
                        <Typography component="h2">Start</Typography>
                        {!isEditMode ? <span> {selectedEvent.day}</span> :
                            <KeyboardDatePicker
                                disableToolbar
                                format="yyyy-MM-DD"
                                margin="normal"
                                id="start"
                                label="Date"
                                inputValue={selectedEvent.day}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                onChange={(_, value) =>
                                {
                                    dispatch(UPDATE_SELECTED_DATE({ day: value }));
                                }}
                            />}
                        {!isEditMode ? <span> {selectedEvent.time}</span> :
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time"
                                ampm={false}
                                inputValue={selectedEvent.time}
                                keyboardIcon={<Schedule />}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                onChange={(_, value) =>
                                {
                                    dispatch(UPDATE_SELECTED_DATE({ time: value }));
                                }}
                            />}
                    </Grid>
                    <Grid container justify='flex-end'>
                        <Grid item xs={12} >
                            {!isEditMode ? <span> {selectedEvent.title.value}</span> : <TextField
                                id="outlined-multiline-static"
                                label="Title"
                                variant="filled"
                                multiline
                                value={selectedEvent.title.value}
                                error={selectedEvent.title.error !== null}
                                helperText={selectedEvent.title.error !== null && selectedEvent.title.error}
                                rows={4}
                                rowsMax={4}
                                fullWidth
                                onChange={(event) =>
                                {
                                    dispatch(UPDATE_SELECTED_TITLE({ title: event.target.value }));
                                }}
                            />}
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    variant="contained"
                    color="delete"
                    style={{
                        color: 'white',
                        backgroundColor: 'red'
                    }}
                    onClick={() =>
                    {
                        deleteEventQuery();
                        if (!loadingDelete) {
                            onClose();
                            setIsEditMode(false);
                        }
                    }}
                >
                    DELETE
                </Button>
                <div>

                    <Button
                        variant="contained"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    
                    {isEditMode && <Button
                        type="submit"
                        variant="contained"
                        disabled={!selectedEvent.title.ready || !selectedEvent.didUpdate}
                        onClick={(event) =>
                        {
                            event.preventDefault();
                            updateEventQuery();
                            if (!loadingUpdate) {
                                onClose();
                                setIsEditMode(false);
                            }
                        }}
                        style={{
                            backgroundColor: ' rgba(123,33,125,1)',
                            color: 'white',
                            marginLeft: '8px'
                        }}
                    >
                        Submit
                </Button>}
                </div>
            </DialogActions>
        </Box>

    </Dialog >
}

export default DisplayEventDialog;