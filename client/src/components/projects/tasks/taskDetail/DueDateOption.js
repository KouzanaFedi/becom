import { Box, Zoom, FormControlLabel, Switch } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from "react";
import { DateTimePicker } from '@material-ui/lab';
import { useMutation } from "@apollo/client";
import { setServiceDueTime, setTaskDueTime } from "../../../../api/project";
import { useDispatch } from "react-redux";
import { SET_SERVICE_DUE_TIME, SET_TASK_DUE_TIME } from "../../../../redux/logic/projectManager/projectSlice";
import ThemedTextField from '../../../themedComponents/ThemedTextField';
import { parseTimeTimePicker } from "../../../../utils/timeParser";

const useStyles = makeStyles(() => ({
    fixBottomMargin: {
        marginBottom: '0px',
        marginRight: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        transition: 'margin 0.3s ease-in-out',
    },
    transition: ({ time }) => ({
        transitionDelay: time !== null ? '100ms' : '0ms'
    }),
    picker: {
        zIndex: '8'
    }
}));

const DueDateOption = ({ taskId, serviceId, openBackDropOpen, closeBackDropOpen, taskDueTime }) =>
{
    const [time, setTime] = useState(taskDueTime);
    const [didMount, setDidMount] = useState(false);
    const classes = useStyles({ time });

    const dispatch = useDispatch();

    const [setDueTime] = useMutation(setTaskDueTime, {
        onCompleted: () =>
        {
            dispatch(SET_TASK_DUE_TIME({ taskId, serviceId, time }));
            closeBackDropOpen();
        }
    });


    const [updateServiceDueTime] = useMutation(setServiceDueTime, {
        onCompleted: () =>
        {
            dispatch(SET_SERVICE_DUE_TIME({ serviceId, time }));
            closeBackDropOpen();
        }
    });

    useEffect(() =>
    {
        setDidMount(true);
    }, []);

    useEffect(() =>
    {
        if (didMount) {
            openBackDropOpen();
            if (taskId) {
                setDueTime({ variables: { id: taskId, time: time ? time.toString() : time } });
            } else updateServiceDueTime({ variables: { id: serviceId, time: time ? time.toString() : time } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return <Box px={1} className={classes.picker}>
        <FormControlLabel
            className={classes.fixBottomMargin}
            label="Due date"
            labelPlacement="start"
            control={<Switch
                color="primary"
                checked={time !== null}
                onChange={(_, checked) =>
                {
                    if (checked) setTime(new Date().getTime());
                    else setTime(null);

                }} />}
        />
        {time && <Zoom
            className={classes.transition}
            in={time !== null}>
            <Box mt={2}>
                <DateTimePicker
                    inputFormat="MM/DD/yyyy HH:mm"
                    id="date"
                    value={parseTimeTimePicker(time)}
                    renderInput={(props) => <ThemedTextField {...props} />}
                    onAccept={(value) =>
                    {
                        setTime(value.valueOf());
                    }}
                    onChange={() => { }}
                />
            </Box>
        </Zoom >}
    </Box>
}

export default DueDateOption;