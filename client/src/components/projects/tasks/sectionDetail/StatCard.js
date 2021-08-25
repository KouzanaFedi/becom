import { Paper, Typography } from '@material-ui/core';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        width: '30%',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#747D88'
    },
    number: ({ color }) => ({
        fontSize: '64px',
        fontWeight: 700,
        color: color,
        lineHeight: '60px'
    }),
    numSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    subTitle: ({ color }) => ({
        color: color,
        fontWeight: 700,

    }),
}));

const StatCard = ({ data: { title, tasks, color, type } }) =>
{
    const classes = useStyles({ color });
    return <Paper className={classes.root}>
        <Typography className={classes.title}>{title.toUpperCase()}</Typography>
        <div className={classes.numSection}>
            <Typography className={classes.number}>{tasks.length}</Typography>
            <Typography className={classes.subTitle}>{type}</Typography>
        </div>
    </Paper>
}

export default StatCard;