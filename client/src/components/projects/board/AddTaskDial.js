import { useMutation } from "@apollo/client";
import { Box, CircularProgress, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTaskForService } from "../../../api/project";
import { clientActiveProjectService, CREATE_TASK_FOR_SERVICE } from "../../../redux/logic/projectManager/projectSlice";
import ThemedButton from "../../themedComponents/ThemedButton";
import ThemedTextField from "../../themedComponents/ThemedTextField";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#F9F9F9"
    },
    card: {
        backgroundColor: '#FFF',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: '5px',
        padding: '15px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    actions: {
        display: 'flex',
        gap: "25px"
    },
    buttons: {
        height: '32px'
    }
}));

const AddTaskDial = forwardRef(({ status, close, openTask }, ref) =>
{
    const classes = useStyles();
    const services = useSelector(clientActiveProjectService);
    const [taskData, setTaskData] = useState({});
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [createTask, { loading }] = useMutation(createTaskForService, {
        onCompleted: ({ createTaskForService }) =>
        {
            dispatch(CREATE_TASK_FOR_SERVICE({ id: createTaskForService.id, title: taskData.title, status, serviceId: taskData.service }));
            close();
            openTask()
        }
    });

    function submit(data)
    {
        setTaskData(data);
        createTask({
            variables: {
                title: data.title,
                status,
                serviceId: data.service
            }
        });

    }

    return <Box ref={ref} pl={1.5} py={2} pr={1.5} className={classes.root}>
        <form className={classes.card} onSubmit={handleSubmit(submit)}>
            <ThemedTextField
                label="Task title"
                inputProps={register('title', { required: 'Required field.' })}
                error={errors?.title !== undefined}
                helperText={errors?.title !== undefined && errors.title.message}
            />
            <ThemedTextField
                select
                label="Service"
                SelectProps={{
                    MenuProps: { disablePortal: true }
                }}
                inputProps={register('service', { required: 'Required field.' })}
                error={errors?.service !== undefined}
                helperText={errors?.service !== undefined && errors.service.message}
            >

                {services.map((service) => <MenuItem
                    key={service._id}
                    value={service._id}>
                    {service.title}
                </MenuItem>)}
            </ThemedTextField>
            <div className={classes.actions}>
                <ThemedButton
                    variant="outlined"
                    classes={{ root: classes.buttons }}
                    buttonStyle={{ type: 'denied' }}
                    onClick={() =>
                    {
                        close();
                    }}
                >
                    Cancel
                </ThemedButton>
                <ThemedButton
                    variant="outlined"
                    buttonStyle={{ type: 'primary' }}
                    classes={{ root: classes.buttons }}
                    type="submit">
                    {loading ? <CircularProgress color="primary"
                        size={20} /> : 'Save'}
                </ThemedButton>
            </div>
        </form>
    </Box>
});

export default AddTaskDial;