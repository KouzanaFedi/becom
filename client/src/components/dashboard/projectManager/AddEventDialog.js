import { useEffect, useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, CircularProgress, Typography, IconButton } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import makeStyles from '@material-ui/styles/makeStyles';
import { ADD_EVENT_TO_LIST } from "../../../redux/logic/projectManager/scheduleSlice";
import { DateTimePicker } from '@material-ui/lab';
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../../api/events";
import ThemedTextField from "../../themedComponents/ThemedTextField";
import ThemedButton from "../../themedComponents/ThemedButton";
import { parseTimeTimePicker } from "../../../utils/timeParser";
import { useForm } from 'react-hook-form'
import { Clear } from '@material-ui/icons';
import { userID } from '../../../redux/logic/userSlice';
import { clientsActiveProject } from '../../../redux/logic/projectManager/projectSlice';

const useStyles = makeStyles(() => ({
    bottomMargin: {
        marginBottom: '16px',
    },
    date: {
        display: 'flex',
        marginBottom: '16px',
        alignItems: 'center'
    },
    label: {
        fontWeight: 700,
    },
    invisible: {
        display: 'none'
    },
    image: {
        maxWidth: '100%',
        width: 'auto',
        margin: '0px auto'
    },
    imageName: {
        wordBreak: 'break-all'
    },
    iconButton: {
        height: "30px",
        width: "30px",
    },
}));

const AddEventDialog = ({ open, onClose, dateClicked }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [time, setTime] = useState(null);
    const [image, setImage] = useState(null);
    const user = useSelector(userID);
    const project = useSelector(clientsActiveProject);

    useEffect(() =>
    {
        setTime(dateClicked);
    }, [dateClicked]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [addEvent, { loading }] = useMutation(ADD_EVENT, {
        onCompleted: ({ addEvent }) =>
        {
            dispatch(ADD_EVENT_TO_LIST({ event: addEvent }));
            onClose();
            reset();
            setImage(null);
        }
    });


    function submit({ title, description })
    {
        addEvent({
            variables: {
                title,
                start: `${time.start}`,
                projectId: project.id,
                projectTitle: project.title,
                end: `${time.end}`,
                description,
                file: image,
                addedBy: user
            }
        })
    }

    return (
        <Dialog maxWidth='md' onClose={onClose} open={open} >
            <Box p={2} >
                <DialogTitle style={{ paddingTop: 0 }} > Add event</DialogTitle>
                <DialogContent dividers>
                    <form id="addEventForm" onSubmit={handleSubmit(submit)}>
                        <Grid container justifyContent="space-between" >
                            <Grid item xs={12}>
                                <ThemedTextField
                                    className={classes.bottomMargin}
                                    inputProps={register('title', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                                    backgroundColor="#EFE"
                                    label="Title"
                                    fullWidth
                                    error={errors?.title !== undefined}
                                    helperText={errors?.title !== undefined && errors.title.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ThemedTextField
                                    inputProps={register('description', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                                    backgroundColor="#EFE"
                                    fullWidth
                                    className={classes.bottomMargin}
                                    multiline
                                    label="Description"
                                    rows={4}
                                    maxRows={6}
                                    error={errors?.description !== undefined}
                                    helperText={errors?.description !== undefined && errors.description.message}
                                />
                            </Grid>
                            <Grid item container alignContent="flex-start" xs={5} >
                                <Grid item xs={12} container alignItems="center" className={classes.bottomMargin}>
                                    <Grid item xs={3}>
                                        <Typography className={classes.label} >Start</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <DateTimePicker
                                            inputFormat="MM/DD/yyyy HH:mm"
                                            id="date"
                                            ampm={false}
                                            value={parseTimeTimePicker(time?.start)}
                                            renderInput={(props) => <ThemedTextField
                                                label="start"
                                                backgroundColor="#EFE"
                                                {...props} />}
                                            onChange={(value) =>
                                            {
                                                setTime({ ...time, start: new Date(value).getTime() });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container alignItems="center" className={classes.bottomMargin}>
                                    <Grid item xs={3}>
                                        <Typography className={classes.label} >End</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <DateTimePicker
                                            inputFormat="MM/DD/yyyy HH:mm"
                                            id="date"
                                            ampm={false}
                                            value={parseTimeTimePicker(time?.end)}
                                            renderInput={(props) => <ThemedTextField
                                                label="end"
                                                fullWidth
                                                backgroundColor="#EFE"
                                                {...props} />}
                                            onChange={(value) =>
                                            {
                                                setTime({ ...time, end: new Date(value).getTime() });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container alignItems="center" className={classes.bottomMargin}>
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
                                                    setImage(event.target.files[0]);
                                                }} />
                                            <ThemedButton
                                                variant="outlined"

                                                buttonStyle={{ type: 'primary' }}
                                                component="span">
                                                Upload
                                            </ThemedButton>
                                        </label>
                                    </Grid>
                                    <Grid item xs={5}><div className={classes.imageName}>{image ? `${image.name}.` : 'No image selected.'}</div></Grid>
                                </Grid>
                            </Grid>
                            {image && <>
                                <Grid item xs={6} >
                                    <Box px={2} display="flex" >
                                        <img src={URL.createObjectURL(image)} className={classes.image} alt="file" />
                                    </Box>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton size={'small'} className={classes.iconButton} onClick={() =>
                                    {
                                        setImage(null);
                                    }}>
                                        <Clear />
                                    </IconButton>
                                </Grid>
                            </>}
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <ThemedButton
                        variant="outlined"
                        buttonStyle={{ type: 'denied' }}
                        onClick={() =>
                        {
                            onClose();
                            reset();
                            setImage(null);
                        }}
                        fullWidth={false}
                    >
                        Cancel
                    </ThemedButton>
                    {<ThemedButton
                        fullWidth={false}
                        type="submit"
                        form="addEventForm"
                        onClick={() =>
                        {
                        }}
                        variant="outlined"
                        buttonStyle={{ type: 'primary' }}
                    >
                        {loading ? <CircularProgress color="primary"
                            size={20} /> : 'Submit'}
                    </ThemedButton>}
                </DialogActions>
            </Box>
        </Dialog >
    );
}

export default AddEventDialog;