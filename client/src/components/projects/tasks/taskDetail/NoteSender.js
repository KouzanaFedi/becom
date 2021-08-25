import { Avatar, CircularProgress } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useForm } from "react-hook-form";
import ThemedTextField from "../../../themedComponents/ThemedTextField";
import ThemedButton from "../../../themedComponents/ThemedButton";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../../../redux/logic/userSlice";
import { IMAGE_ENDPOINT } from "../../../../config";
import { useMutation } from "@apollo/client";
import { sendNoteToProject } from "../../../../api/project";
import { ADD_NOTE_TO_PROJECT } from "../../../../redux/logic/projectManager/projectSlice";
import { useState } from "react";

const useStyles = makeStyles(() => ({
    root: {
        paddingLeft: '5px',
        display: 'flex',
        marginTop: '8px'
    },
    container: {
        width: '100%',
        display: 'flex',
        marginLeft: '15px',
        flexDirection: 'column'
    },
    submitButton: {
        marginTop: '10px',
        width: '120px'
    },
    avatar: {
        width: '34px',
        height: '34px'
    }
}));

const NoteSender = ({ taskId, serviceId }) =>
{
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const user = useSelector(userData);
    const [messageSend, setMessageSend] = useState(null);

    const dispatch = useDispatch();

    const [sendNote, { loading }] = useMutation(sendNoteToProject, {
        onCompleted: () =>
        {
            dispatch(ADD_NOTE_TO_PROJECT({
                serviceId,
                taskId,
                message: messageSend,
                sender: {
                    _id: user.id,
                    name: user.name,
                    image: user.image,
                    email: user.email
                }
            }));
        }
    });

    const submit = ({ note }) =>
    {
        setMessageSend(note);
        sendNote({ variables: { sender: user.id, message: note, id: taskId ? taskId : serviceId, toTask: taskId !== undefined } });
        if (!loading) reset();
    }

    return <form className={classes.root} onSubmit={handleSubmit(submit)}>
        <Avatar className={classes.avatar} src={user.image ? `${IMAGE_ENDPOINT}${user.image}` : null} alt={user.name} />
        <div className={classes.container}>
            <ThemedTextField
                inputProps={register('note', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                backgroundColor="#EFE"
                fullWidth
                multiline
                maxRows={4}
                error={errors?.note !== undefined}
                helperText={errors?.note !== undefined && errors.note.message}
            />
            <div className={classes.submitButton}>
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    variant="outlined"
                    fullWidth={false}
                    type="submit"
                >
                    {false ? <CircularProgress color="primary"
                        size={24} /> : 'Send'}
                </ThemedButton>
            </div>
        </div>
    </form>
}

export default NoteSender;