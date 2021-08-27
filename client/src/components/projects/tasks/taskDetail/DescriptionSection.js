import { Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Edit, Clear, Done } from '@material-ui/icons'
import { useEffect, useState } from "react";
import ThemedTextField from "../../../themedComponents/ThemedTextField";
import { useForm } from "react-hook-form";
import Color from "color";
import { useMutation } from "@apollo/client";
import { updateServiceDescription, updateTaskDescription } from "../../../../api/project";
import { UPDATE_TASK_DESCRIPTION, UPDATE_SERVICE_DESCRIPTION } from "../../../../redux/logic/projectManager/projectSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
    root: ({ editing }) => ({
        display: 'flex',
        gap: '5px',
        alignItems: 'flex-end',
        justifyContent: editing ? 'space-between' : 'unset'
    }),
    label: {
        marginTop: '10px',
        color: '#000',
        fontWeight: '600',
        alignItems: 'unset'
    },
    content: {
        fontSize: '14px',
        marginLeft: '5px',
        marginTop: '5px'
    },
    icon: {
        '&:hover': {
            color: '#000'
        },
        '& svg': {
            width: '16px',
            height: '16px'
        }
    },
    iconValid: {
        color: Color('#008000').alpha(.6).toString(),
        '&:hover': {
            color: '#008000'
        },
    },
    iconClear: {
        color: Color('#ff0000').alpha(.6).toString(),
        '&:hover': {
            color: '#ff0000'
        },
    },
    editingField: {
        marginTop: '1px',
        minHeight: 'auto',
        '& .MuiInputBase-multiline': {
            padding: '3.5px 5px',
            fontSize: '14px',
        }
    },
    actions: {
        display: 'flex',
        gap: '15px'
    }
}));

const DescriptionSection = ({ description, serviceId, openBackDropOpen, closeBackDropOpen, taskId }) =>
{
    const [editing, setEditing] = useState(!(description !== null));
    const classes = useStyles({ editing });
    const [descriptionStored, setDescriptionStored] = useState(description);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        setDescriptionStored(description);
    }, [description]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { updateDescription: descriptionStored } });

    const [sendUpdate] = useMutation(updateTaskDescription, {
        onCompleted: () =>
        {
            dispatch(UPDATE_TASK_DESCRIPTION({ description: descriptionStored, taskId, serviceId }));
            closeBackDropOpen();
        }
    });

    const [sendServiceUpdate] = useMutation(updateServiceDescription, {
        onCompleted: () =>
        {
            dispatch(UPDATE_SERVICE_DESCRIPTION({ description: descriptionStored, serviceId }));
            closeBackDropOpen();
        }
    });

    function submit({ updateDescription })
    {
        setDescriptionStored(updateDescription);
        openBackDropOpen();
        if (taskId) sendUpdate({
            variables: {
                id: taskId,
                description: updateDescription
            }
        });
        else sendServiceUpdate({
            variables: {
                id: serviceId,
                description: updateDescription
            }
        });
        setEditing(false);
    }

    return <Box p={2}>
        <div className={classes.root}>
            <Typography className={classes.label}>Description</Typography>
            {!editing ? <IconButton
                className={classes.icon}
                size="small"
                onClick={() =>
                {
                    setEditing(true);
                }}
            >
                <Edit />
            </IconButton> : <div className={classes.actions}>
                <IconButton
                    className={classes.icon + ' ' + classes.iconClear}
                    size="small"
                    onClick={() =>
                    {
                        setEditing(false);
                        reset({ updateDescription: descriptionStored });
                    }}
                >
                    <Clear />
                </IconButton>
                <IconButton
                    className={classes.icon + ' ' + classes.iconValid}
                    size="small"
                    type="submit"
                    onClick={() =>
                    {
                        handleSubmit(submit)();
                    }}
                >
                    <Done />
                </IconButton>
            </div>}
        </div>
        {!editing ?
            <Typography className={classes.content} >{description}</Typography> :
            <ThemedTextField
                className={classes.editingField}
                fullWidth
                multiline
                maxRows={4}
                error={errors?.updateDescription !== undefined}
                helperText={errors?.updateDescription !== undefined && errors.updateDescription.message}
                inputProps={register('updateDescription', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
            />
        }
    </Box>
}

export default DescriptionSection;
