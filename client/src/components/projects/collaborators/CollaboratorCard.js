import { Avatar, Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Chat } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        marginBottom: '5px'
    },
    icon: {
        height: '25px',
        marginRight: '10px'
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    download: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    first: {
        textAlign: 'start'
    },
    headers: {
        color: '#999',
        fontWeight: 700,
        fontSize: '14px'
    },
    fixLineHeight: {
        lineHeight: '36px'
    }
}));

const CollaboratorCard = () =>
{
    const classes = useStyles();

    return <Paper>
        <Box px={2} py={1} className={classes.root}>
            <Grid container>
                <Grid item xs={2}>
                    <Avatar />
                </Grid>
                <Grid item xs={2} >
                    <Typography className={classes.fixLineHeight}>3othmen ben 3olwen</Typography>
                </Grid>
                <Grid item xs={2} >
                    <Typography className={classes.fixLineHeight}> Client </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Typography className={classes.fixLineHeight}>23232323</Typography>
                </Grid>
                <Grid item xs={2} >
                    <Typography className={classes.fixLineHeight}>mo7sen@guruguru.com</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button>
                        <Chat />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Paper>
}

export default CollaboratorCard;

export const CollaboratorHeader = () =>
{
    const classes = useStyles();
    return <Box px={2} pb={1}>
        <Grid container className={classes.headers}>
            <Grid item xs={2} >

            </Grid>
            <Grid item xs={2}>
                Full name
            </Grid>
            <Grid item xs={2}>
                Status
            </Grid>
            <Grid item xs={2}>
                Phone number
            </Grid>
            <Grid item xs={2}>
                E-mail
            </Grid>
            <Grid item xs={2}>
                Direct message
            </Grid>
        </Grid>
    </Box>
}