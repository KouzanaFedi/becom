import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { scheduleEventToCreate, ADD_EVENT_TO_LIST, SET_EVENT_TITLE, SET_CREATED_DATE } from "../../../redux/logic/projectManager/scheduleSlice";
import { DatePicker, TimePicker } from '@material-ui/lab';
import { Schedule } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../../api/events";
import ThemedTextField from "../../themedComponents/ThemedTextField";

const AddEventDialog = ({ open, onClose }) =>
{
    const eventToCreate = useSelector(scheduleEventToCreate);
    const dispatch = useDispatch();
    const [addEvent, { loading }] = useMutation(ADD_EVENT, {
        variables: {
            start: `${eventToCreate.day} ${eventToCreate.time}`,
            title: eventToCreate.title.value,
            projectId: "607d496a031c940568bab463"
        },
        onCompleted: ({ addEvent }) =>
        {
            dispatch(ADD_EVENT_TO_LIST({ event: addEvent }));
        }
    });

    return (
        <Dialog maxWidth='md' open={open} onEscapeKeyDown={onClose} >
            <Box p={2} >
                <DialogTitle style={{ paddingTop: 0 }} > Add event</DialogTitle>
                <DialogContent dividers>
                    <Grid container justifyContent="space-between" >
                        <Grid item xs={3}>
                            <Typography component="h2">Start</Typography>
                            <DatePicker
                                inputFormat="yyyy-MM-DD"
                                id="start"
                                value={eventToCreate.day}
                                renderInput={(props) => <ThemedTextField {...props} />}
                                OpenPickerButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                onChange={(_, value) =>
                                {
                                    dispatch(SET_CREATED_DATE({ day: value }));
                                }}
                            />
                            <TimePicker
                                id="time-picker"
                                ampm={false}
                                value={eventToCreate.time}
                                components={{ OpenPickerIcon: <Schedule /> }}
                                renderInput={(props) => <ThemedTextField {...props} />}
                                OpenPickerButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                onChange={(_, value) =>
                                {
                                    dispatch(SET_CREATED_DATE({ time: value }));
                                }}
                            />
                        </Grid>
                        <Grid container justifyContent='flex-end'>
                            <Grid item xs={12} >
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Title"
                                    variant="filled"
                                    multiline
                                    value={eventToCreate.title.value}
                                    error={eventToCreate.title.error !== null}
                                    helperText={eventToCreate.title.error !== null && eventToCreate.title.error}
                                    rows={4}
                                    maxRows={4}
                                    fullWidth
                                    onChange={(event) =>
                                    {
                                        dispatch(SET_EVENT_TITLE({ title: event.target.value }))
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    {<Button
                        type="submit"
                        variant="contained"
                        disabled={!eventToCreate.title.ready}
                        onClick={(event) =>
                        {
                            event.preventDefault();
                            addEvent();
                            if (!loading) {
                                onClose();
                            }
                        }}
                        style={{
                            backgroundColor: ' rgba(223,49,69,1)',
                            color: 'white',
                        }}
                    >
                        Submit
                    </Button>}
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default AddEventDialog;