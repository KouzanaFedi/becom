import { useMutation } from "@apollo/client";
import { Box, Button, Grid, IconButton } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Delete, EmailOutlined, Done } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { ADD_USER_TO_SHARED_LINK, DELETE_CIBLE } from "../../../../api/events";
import { DELETE_SHARED_LINK_CIBLE } from "../../../../redux/logic/projectManager/scheduleSlice";
import ThemedTextField from "../../../themedComponents/ThemedTextField";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) =>
({
    deleteButtonContainer: {
        justifyContent: 'flex-end'
    },
    sendEmail: {
        fontWeight: 'bold',
        color: 'rgba(123,33,125,0.6)',
        padding: "0 5px",
        "&:hover": {
            backgroundColor: "unset",
            color: 'rgba(123,33,125,1)'
        }
    },
    cancelBtn: {
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.6)',
        padding: "0 5px",
        "&:hover": {
            backgroundColor: "unset",
            color: 'red'
        }
    },
    cardStyle: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        paddingLeft: '14px',
    },
    formWidth: {
        width: "100%"
    }
}));

const CibleForm = ({ data, edit, sharedId, deleteFromData, updateDate, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: { email: data.email, name: data.name } });

    const [deleteCible] = useMutation(DELETE_CIBLE, {
        onCompleted: (_) =>
        {
            deleteFromData(data._id);
            dispatch(DELETE_SHARED_LINK_CIBLE({ cibleId: data._id, sharedLinkId: sharedId }));
            closeBackDropOpen();
        }
    });

    const [addUserToShared] = useMutation(ADD_USER_TO_SHARED_LINK, {
        onCompleted: ({ addUserToScheduleLink }) =>
        {
            updateDate(data._id, addUserToScheduleLink._id, addUserToScheduleLink.email, addUserToScheduleLink.name);
            closeBackDropOpen();
        }
    });

    function submit({ email, name })
    {
        openBackDropOpen();
        addUserToShared({
            variables: {
                sharedLinkId: sharedId,
                email,
                name
            }
        });
    }

    return (<Box mt={1}>
        <Box display='flex' alignItems='center'>
            <form id={"cibleAddForm" + data._id} onSubmit={handleSubmit(submit)} className={classes.formWidth}>
                <Grid container spacing={1} >
                    <Grid item xs={8} >
                        <ThemedTextField
                            inputProps={register('email', {
                                required: true, pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                            label={edit ? '' : 'Email'}
                            backgroundColor={!edit ? '#EfE' : "inherit"}
                            disabled={edit}
                            disabledWithBorder
                            error={errors?.email !== undefined}
                            helperText={errors?.email !== undefined && errors.email.message}
                            fullWidth
                        />

                    </Grid>
                    <Grid item xs={4} >
                        <ThemedTextField
                            inputProps={register('name', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                            label={edit ? '' : 'Name'}
                            backgroundColor={!edit ? '#EfE' : "inherit"}
                            disabled={edit}
                            disabledWithBorder
                            error={errors?.name !== undefined}
                            helperText={errors?.name !== undefined && errors.name.message}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </form>
            <Box ml={1} pr={1}>
                {edit ?
                    <IconButton size="small"
                        color="error"
                        onClick={
                            () =>
                            {
                                openBackDropOpen();
                                deleteCible({
                                    variables: {
                                        sharedLinkId: sharedId,
                                        cibleId: data._id
                                    }
                                });
                            }
                        }>
                        <Delete />
                    </IconButton > :
                    <IconButton size="small"
                        color="success"
                        type="submit"
                        form={"cibleAddForm" + data._id}
                    >
                        <Done />
                    </IconButton >}
            </Box>
        </Box>
        <Box mt={1}>
            <Grid item xs={12} display="flex" justifyContent='flex-end'>
                {edit ? <Button
                    size="small"
                    startIcon={<EmailOutlined />}
                    className={classes.sendEmail}>
                    Send link
                </Button> : <Button
                    size="small"
                    onClick={() => deleteFromData(data._id)}
                    className={classes.cancelBtn}>
                    Cancel
                </Button>}
            </Grid>
        </Box>
    </Box >)
}

export default CibleForm;