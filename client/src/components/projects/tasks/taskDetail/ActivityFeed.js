import { Avatar, Box } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        paddingLeft: '5px',
        marginTop: '10px',
        marginBottom: '15px',
        alignItems: 'center'
    },
    avatar: {
        height: '34px',
        width: '34px',
        marginRight: '15px'
    },
    time: {
        fontSize: '12px',
        color:'#999'
    }
}));

const ActivityFeed = ({ text }) =>
{
    const classes = useStyles();

    return <Box className={classes.root}>
        <Avatar className={classes.avatar} />
        <Box className={classes.notNote}>
            {text} <span className={classes.time}> 10 minutes ago </span>
        </Box>
    </Box>
}

export default ActivityFeed;