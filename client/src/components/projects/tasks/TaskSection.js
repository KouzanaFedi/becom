import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { ExpandMore, ArrowForwardIos } from "@material-ui/icons";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskHeader from "./TaskHeader";
import { useDispatch } from "react-redux";
import { SET_SELECTED_TASK } from "../../../redux/logic/projectManager/projectSlice";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#EEFFEE'
    },
    accordionContent: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 24px'
    },
    sectionName: {
        fontWeight: 600,
        fontSize: '24px',
        textTransform: 'uppercase',
        marginLeft: '16px',
        transition: 'margin 0.3s ease-in-out',
        '&:hover': {
            marginRight: '10px',
        }
    },
    icon: {
        transition: 'margin 0.3s ease-in-out',
        '&:hover': {
            marginLeft: '10px',
        }
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000',
        '&:hover': {
            color: '#666'
        }
    },
    notFirst: {
        '&:not(:first-child)': {
            marginTop: '16px'
        }
    }
}));

const TaskSection = ({ title, tasks, openTaskGroup, openTask, serviceId }) =>
{
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);
    const dispatch = useDispatch();

    return <Accordion
        className={classes.root}
        expanded={expanded}
        onChange={() => { setExpanded(!expanded) }}>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <div className={classes.titleContainer} onClick={(e) =>
            {
                e.stopPropagation();
                dispatch(SET_SELECTED_TASK({ taskId: null, serviceId }));
                openTaskGroup();
            }}>
                <Typography className={classes.sectionName}>{title}</Typography>
                <ArrowForwardIos fontSize="small" className={classes.icon} />
            </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionContent}>
            {tasks.map((task) => task.tasks.length > 0 && <div key={task._id} className={classes.notFirst}>
                <TaskHeader color={task.color} state={task.title} />
                {task.tasks.map((taskdata) => <TaskCard key={taskdata._id} serviceId={serviceId} openTask={openTask} data={taskdata} color={task.color} />)}
            </div>)}
        </AccordionDetails>
    </Accordion>
}

export default TaskSection;