import { useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, Grid, IconButton, TextField } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Delete, EmailOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { DELETE_CIBLE } from "../../../../api/events";
import { DELETE_SHARED_LINK_CIBLE } from "../../../../redux/logic/projectManager/scheduleSlice";

const useStyles = makeStyles((theme) =>
({
    deleteButtonContainer: {
        justifyContent: 'flex-end'
    },
    sendEmail: {
        fontWeight: 'bold',
        color: 'rgba(123,33,125,1)'
    },
    cardStyle: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        paddingLeft: '14px',
    },
}));

const CibleForm = ({ data, edit, sharedLink }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [deleteCible, { loading }] = useMutation(DELETE_CIBLE, {
        onCompleted: (_) =>
        {
            dispatch(DELETE_SHARED_LINK_CIBLE({ cibleId: data.id, sharedLinkId: sharedLink }));
        }
    });

    return (<Box my={2}>
        <Box display='flex' alignItems='center'>
            <Grid container spacing={1} >
                <Grid item xs={6} >
                    {(edit !== "edit") ?
                        <Box className={classes.cardStyle} mr={2}>
                            {data.email}</Box> :
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={data.email} />}

                </Grid>
                <Grid item xs={3} >
                    {(edit !== "edit") ?
                        <Box className={classes.cardStyle} mr={2}>
                            {data.firstName}</Box> :
                        <TextField
                            label="First name"
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={data.firstName} />}
                </Grid>
                <Grid item xs={3} >
                    {(edit !== "edit") ?
                        <Box className={classes.cardStyle} mr={2}>
                            {data.lastName}</Box> : <TextField
                            label="Last name"
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={data.lastName} />}
                </Grid>
            </Grid>
            <Box ml={1}>
                {!loading ? <IconButton size="small"
                    onClick={
                        () =>
                        {
                            deleteCible({
                                variables: {
                                    sharedLinkId: sharedLink,
                                    cibleId: data.id
                                }
                            });
                        }
                    }>
                    <Delete />
                </IconButton > : <CircularProgress />}
            </Box>
        </Box>
        <Box mt={1}>
            <Grid container item justifyContent='flex-end'>
                <Button
                    size="small"
                    startIcon={<EmailOutlined />}
                    className={classes.sendEmail}>
                    Send e-mail
                </Button>
            </Grid>
        </Box>

    </Box>)
}

export default CibleForm;