import { Avatar, Box, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { IMAGE_ENDPOINT } from "../../../../config";
import { parseTime } from "../../../../utils/timeParser";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        paddingLeft: '5px',
        marginTop: '10px',
        marginBottom: '15px'
    },
    avatar: {
        height: '34px',
        width: '34px',
        marginRight: '15px'
    },
    note: {
        borderRadius: '5px',
        padding: '5px 10.5px',
        border: '1px solid #999',
    },
    head: {
        display: 'flex',
        alignItems: 'baseline'
    },
    time: {
        fontSize: '10px',
        color: '#999',
    },
    name: {
        fontWeight: 600,
        fontSize: '12px',
        marginRight: '10px',
        textTransform: 'capitalize'
    },
    message: {
        fontSize: '12px',
    }
}));

const NoteFeed = ({ data }) =>
{
    const classes = useStyles();
    return <Box className={classes.root}>
        <Avatar className={classes.avatar} src={data.sender.image ? `${IMAGE_ENDPOINT}${data.sender.image}` : null} alt={data.sender.name.toUpperCase()} />
        <Box className={classes.note}>
            <Box className={classes.head}>
                <Typography className={classes.name}>{data.sender.name}</Typography>
                <Typography className={classes.time}>{parseTime(data.createdAt)}</Typography>
            </Box >
            <Typography className={classes.message}>
                {data.message}
            </Typography>
        </Box>
    </Box>
}

export default NoteFeed;