import { Grid, Typography, Box } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Comment, Event, Timeline } from "@material-ui/icons";
import { useEffect, useState, useMemo } from "react";
import StatCard from "./sectionDetail/StatCard";
import NoteFeed from "./taskDetail/NoteFeed";
import NoteSender from "./taskDetail/NoteSender";
import TaskDoughnuts from "./sectionDetail/TaskDoughnuts";
import AppBarMenuButton from "./taskDetail/AppBarMenuButton";
import DueDateOption from "./taskDetail/DueDateOption";
import { parseTime } from "../../../utils/timeParser";
import DescriptionSection from "./taskDetail/DescriptionSection";

const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '40px',
        background: `linear-gradient(135deg,${theme.palette.secondary.main} 0%,  ${theme.palette.primary.main} 100%)`,
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        zIndex: '100',
        width: '100%'
    },
    icon: {
        color: '#fff',
        marginRight: '5px'
    },
    btnTitle: {
        color: '#fff',
        fontWeight: '600',
    },
    iconGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#000',
        fontWeight: 700,
        fontSize: '18px',
        textTransform: 'uppercase'
    },
    label: {
        marginTop: '10px',
        color: '#000',
        fontWeight: '600',
        alignItems: 'unset'
    },
    content: {
        fontSize: '14px',
        marginLeft: '5px',
        marginTop: '5px'
    },
    statRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    fixMargin: {
        marginTop: '40px'
    },
}));


const SectionDetail = ({ stats, data, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles();
    const [dougnhutData, setDougnhutData] = useState({});
    const [sum, setSum] = useState(0);
    const [notesArray, setNotesArray] = useState([]);

    useEffect(() =>
    {
        const donutData = {
            labels: [],
            datasets: [
                {
                    label: 'State of tasks',
                    data: [],
                    backgroundColor: []
                },

            ],
        };

        data.tasksByStatus.forEach((stat) =>
        {
            donutData.labels.push(stat.title);
            donutData.datasets[0].data.push(stat.tasks.length);
            donutData.datasets[0].backgroundColor.push(stat.color);
        });
        setDougnhutData(donutData);
        setSum(donutData.datasets[0].data.reduce((total, num) => total + num), 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() =>
    {
        const notesData = [...data.notes];
        const sortedNotesData = notesData.sort((n1, n2) => parseInt(n2.createdAt) - parseInt(n1.createdAt));
        setNotesArray(sortedNotesData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    return <Grid container>
        <Grid item xs={12} className={classes.appBar}>
            <AppBarMenuButton
                buttonContent={<div className={classes.iconGroup}>
                    <Event className={classes.icon} />
                    <Typography className={classes.btnTitle}>Due time</Typography>
                </div>}
                menuContent={<DueDateOption
                    serviceId={data._id}
                    openBackDropOpen={openBackDropOpen}
                    closeBackDropOpen={closeBackDropOpen}
                    taskDueTime={data.dueTime}
                />}
            />
        </Grid>
        <Grid item xs={12} className={classes.fixMargin} >
            <Box p={2}>
                <Typography className={classes.title}>
                    {data.title}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={8}>
            <DescriptionSection
                serviceId={data._id}
                openBackDropOpen={openBackDropOpen}
                closeBackDropOpen={closeBackDropOpen}
                description={data.description} />
        </Grid>
        <Grid item xs={4}>
            <Box p={2}>
                <Typography className={classes.label}>Due time</Typography>
                <Typography className={classes.content} >  {data.dueTime ? parseTime(data.dueTime) : 'not set'} </Typography>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box p={2} className={classes.statRoot}>
                {data.tasksByStatus.map((stat) => <StatCard key={stat._id} data={stat} />)}
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box p={2}>
                <TaskDoughnuts data={dougnhutData} sum={sum} />
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Comment />
                    </Box>
                    <Typography className={classes.semiBold}>Notes</Typography>
                </div>
                <NoteSender serviceId={data._id} />
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Timeline />
                    </Box>
                    <Typography className={classes.semiBold}>Notes</Typography>
                </div>
                {notesArray.map((note) => <NoteFeed key={note._id} data={note} />)}
            </Box>
        </Grid>
    </Grid>
}

export default SectionDetail;