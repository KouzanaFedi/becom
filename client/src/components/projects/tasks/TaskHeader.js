import { Grid, Typography } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles(() => ({
    state: ({ color }) => ({
        color: color,
        fontFamily: 'roboto',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '18px',
        textAlign: 'start'
    }),
    headerTitles: {
        color: '#CECECE',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'roboto',
    },
    headerRoot: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
    },
    lastItem: {
        textAlign: 'end'
    },
}));

const TaskHeader = ({ state, color }) =>
{
    const classes = useStyle({ color });
    return <Grid container className={classes.headerRoot}>
        <Grid item xs={6}>
            <Typography className={classes.state}>
                {state}
            </Typography>
        </Grid>
        <Grid item xs={2} >
            <Typography className={classes.headerTitles}>attachs/notes</Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography className={classes.headerTitles}>Assigned to</Typography>
        </Grid>
        <Grid item xs={2} className={classes.lastItem}>
            <Typography className={classes.headerTitles}>Due date</Typography>
        </Grid>
    </Grid>
}

export default TaskHeader;