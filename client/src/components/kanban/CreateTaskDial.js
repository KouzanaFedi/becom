import { useMutation } from "@apollo/client";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Button } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_TASK } from "../../api/project";
import { boardTaskTypes, boardCreatedTaskForm, SET_CREATE_TASK_TASK_TYPE, SET_CREATE_TASK_TITLE, SET_TASK_START_DATE, SET_TASK_END_DATE, SET_TASK_DESCRIPTION, boardCreatedTaskFormCanSend, ADD_CREATED_CARD } from "../../redux/logic/projectManager/kanbanBoardSlice";

const useStyles = makeStyles(() => ({

    selectInput: {
        minWidth: "100%",
    }
}));

const CreateTaskDial = ({ open, onClose }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const taskTypes = useSelector(boardTaskTypes);
    const createForm = useSelector(boardCreatedTaskForm);
    const canSend = useSelector(boardCreatedTaskFormCanSend);

    const [createTaskQuery] = useMutation(CREATE_TASK, {
        onCompleted: ({ createTask }) =>
        {
            const { id, name, description, assignedTo, start, end, priority } = createTask;
            dispatch(ADD_CREATED_CARD({ id, name, description, start, end, assignedTo, priority }));
            onClose();
        }
    });

    return <Dialog maxWidth='md' fullWidth open={open} onEscapeKeyDown={onClose} >
        <Box p={2} >
            <DialogTitle style={{ paddingTop: 0 }} >Create Task</DialogTitle>
            <DialogContent dividers className={classes.modal}>
                <Grid container justify="space-between" >
                    <Grid item xs={3}>
                        <Box pr={2}>
                            <Box mb={0.5}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    size="small"
                                    value={createForm.title.value}
                                    onChange={(event) =>
                                    {
                                        dispatch(SET_CREATE_TASK_TITLE({ title: event.target.value }));
                                    }}
                                />
                            </Box>
                            <FormControl className={classes.selectInput}>
                                <InputLabel htmlFor="grouped-select">Task Type</InputLabel>
                                <Select
                                    defaultValue=""
                                    id="grouped-select"
                                    value={createForm.taskType}
                                    onChange={(event) =>
                                    {
                                        dispatch(SET_CREATE_TASK_TASK_TYPE({ type: event.target.value }))
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {taskTypes.map((type) =>
                                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <KeyboardDateTimePicker
                                disableToolbar
                                format="yyyy-MM-DD hh:mm"
                                margin="normal"
                                ampm={false}
                                id="start"
                                label="Start"
                                inputValue={createForm.startDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                onChange={(_, value) =>
                                {
                                    dispatch(SET_TASK_START_DATE({ startDate: value }));
                                }}
                            />
                            <KeyboardDateTimePicker
                                disableToolbar
                                format="yyyy-MM-DD hh:mm"
                                margin="normal"
                                ampm={false}
                                id="end"
                                label="end"
                                inputValue={createForm.endDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                onChange={(_, value) =>
                                {

                                    dispatch(SET_TASK_END_DATE({ endDate: value }));
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box pl={2}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                variant="outlined"
                                multiline
                                value={createForm.description.value}
                                error={createForm.description.error !== null}
                                helperText={createForm.description.error !== null && createForm.description.error}
                                rows={4}
                                rowsMax={9}
                                fullWidth
                                onChange={(event) =>
                                {
                                    dispatch(SET_TASK_DESCRIPTION({ description: event.target.value }))
                                }}
                            />
                        </Box>
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
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!canSend}
                    onClick={(event) =>
                    {
                        event.preventDefault();
                        createTaskQuery({ variables: { name: createForm.title.value, typeId: createForm.taskType, assignedToId: "60630c71ae035406e2ea4330", start: createForm.startDate, end: createForm.endDate, description: createForm.description.value, projectId: "609130ce3dc0a3080b519945" } });
                    }}
                    style={{
                        backgroundColor: ' rgba(223,49,69,1)',
                        color: 'white',
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Box>
    </Dialog >
}

export default CreateTaskDial;