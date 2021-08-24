import { Box, Paper, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { useLayoutEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
    abs: {
        position: 'relative'
    },
    relat: ({ offset }) => ({
        position: 'absolute',
        top: `${offset}px`,
        left: `${offset}px`,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: "#000",
    }),
    numb: {
        fontWeight: 700,
        fontSize: '28px',
        marginBottom: '-12px'
    },
    subText: {
        fontSize: '14px'
    }
}));

const TaskDoughnuts = ({ data, sum }) =>
{
    const ref = useRef(null);
    const [yOffset, setYOffset] = useState(0);

    useLayoutEffect(() =>
    {
        setYOffset(ref.current.clientWidth * .5);
    }, []);

    const classes = useStyles({ offset: yOffset });
    return <Paper ref={ref} className={classes.abs}>
        <Box p={2}>
            <Doughnut data={data} />
        </Box>
        <div className={classes.relat}>
            <Typography className={classes.numb}>{sum}</Typography>
            <Typography className={classes.subText}>Total tasks</Typography>
        </div>
    </Paper>
}

export default TaskDoughnuts;