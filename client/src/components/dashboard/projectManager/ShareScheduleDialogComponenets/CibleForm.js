import { Box, Button, Grid, IconButton, makeStyles, TextField} from "@material-ui/core"
import { Delete, EmailOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { scheduleDisplayCalendarForm } from "../../../../redux/logic/projectManager/scheduleSlice";

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
        fontWeight: 'bold'
    },
}));

const CibleForm = ({ data }) =>
{
    const classes = useStyles();
    const displayCalendarForm = useSelector(scheduleDisplayCalendarForm);

    return (<Box my={2}>
        <Box display='flex' alignItems='center'>
            <Grid container spacing={1} >
                <Grid item xs={6} >
                    {(displayCalendarForm === "edit") ?
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
                    <TextField
                        label="First name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={data.firstName} />
                </Grid>
                <Grid item xs={3} >
                    <TextField
                        label="Last name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={data.lastName} />
                </Grid>
            </Grid>
            <Box ml={1}>
                <IconButton size="small" >
                    <Delete />
                </IconButton >
            </Box>
        </Box>
        <Box mt={1}>
            <Grid container item justify='flex-end'>
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