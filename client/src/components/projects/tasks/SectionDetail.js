import { Grid, Typography, Box } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Comment, Timeline } from "@material-ui/icons";
import { useEffect, useState, useMemo } from "react";
import StatCard from "./sectionDetail/StatCard";
import ActivityFeed from "./taskDetail/ActivityFeed";
import NoteFeed from "./taskDetail/NoteFeed";
import NoteSender from "./taskDetail/NoteSender";
import TaskDoughnuts from "./sectionDetail/TaskDoughnuts";

const useStyles = makeStyles(() => ({
    title: {
        color: '#000',
        fontWeight: 700,
        fontSize: '18px'
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
        justifyContent: 'space-between',
    },
    iconGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
}));


const SectionDetail = ({ stats, data }) =>
{
    const classes = useStyles();
    console.log(data);
    const simpleStat = useMemo(() => stats, [stats]);
    const [dougnhutData, setDougnhutData] = useState({});
    const [sum, setSum] = useState(0);

    useEffect(() =>
    {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'State of tasks',
                    data: [],
                    backgroundColor: []
                },

            ],
        };

        simpleStat.forEach((stat) =>
        {
            data.labels.push(stat.name);
            data.datasets[0].data.push(stat.value);
            data.datasets[0].backgroundColor.push(stat.color);
        });
        setDougnhutData(data);
        setSum(data.datasets[0].data.reduce((total, num) => total + num), 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simpleStat]);

    return <Grid container>
        <Grid item xs={12}>
            <Box p={2}>
                <Typography className={classes.title}>
                    SITE WEB
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={8}>
            <Box px={2} pb={2}>
                <Typography className={classes.label}>Description</Typography>
                <Typography className={classes.content} >Cillum eiusmod ad et aliqua dolore exercitation qui ad nisi id deserunt et. Pariatur nisi excepteur deserunt occaecat fugiat excepteur anim non laborum qui. Sint esse culpa cupidatat aliqua laborum est et officia dolor labore esse ex sint laborum. Veniam minim labore aliquip qui Lorem ea elit et id ut.</Typography>
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Box p={2}>
                <Typography className={classes.label}>Due time</Typography>
                <Typography className={classes.content} > 12-04-2009 15:25 </Typography>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box p={2} className={classes.statRoot}>
                {simpleStat.map((stat, key) => <StatCard key={key} data={stat} />)}
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
                <NoteSender toTask={false} />
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Timeline />
                    </Box>
                    <Typography className={classes.semiBold}>Activities</Typography>
                </div>
                {/* <NoteFeed text="Et cupidatat tempor exercitation do dolore duis ex officia nulla elit voluptate. Occaecat fugiat in Lorem elit exercitation anim velit est. Mollit ipsum anim minim labore ea amet non magna dolore dolor labore incididunt aute. Ut quis sint duis velit veniam dolor et quis ipsum voluptate dolor. Sint adipisicing occaecat Lorem reprehenderit nulla culpa reprehenderit magna reprehenderit fugiat." />
                <NoteFeed text="Et cupidatat tempor exercitation do dolore duis ex officia nulla elit voluptate." />
                <ActivityFeed text="Et cupidatat tempor exercitation do dolore duis ex officia nulla elit voluptate." /> */}
            </Box>
        </Grid>
    </Grid>
}

export default SectionDetail;