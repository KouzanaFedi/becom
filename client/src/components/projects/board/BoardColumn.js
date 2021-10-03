import { Box, ClickAwayListener, Collapse, IconButton, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import BoardCard from "./BoardCard";
import { Add } from '@material-ui/icons';
import { Droppable } from "react-beautiful-dnd";
import AddTaskDial from "./AddTaskDial";
import { useState } from "react";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        '&:not(:last-child)': {
            marginRight: '15px'
        },
    },
    container: {
        width: '270px',
        backgroundColor: '#F9F9F9   ',
        padding: '10px 7px',
        height: 'inherit',
        overflowY: 'auto',
        "&::-webkit-scrollbar": {
            width: '3px',
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#CCC"
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: ({ color }) => ({
        color,
        fontWeight: 700,
        fontSize: '16px',
        textTransform: 'uppercase'
    }),
    icon: {
        color: '#999',
        borderRadius: '100%',
        '&:hover': {
            color: '#000',
        },
    },
    iconButton: {
        height: "30px",
        width: "30px",
        "&:hover": {
            backgroundColor: 'unset'
        }
    },
    transition: ({ addingTask }) => ({
        transitionDelay: addingTask !== null ? '100ms' : '0ms'
    }),
}));

const BoardColumn = ({ data: { title, color, tasks, _id }, openTask }) =>
{
    const [addingTask, setAddingTask] = useState(false);
    const classes = useStyles({ color, addingTask });

    return <Box className={classes.root}>
        <Box px={1} pb={1} className={classes.header} >
            <Typography className={classes.title}>{title}</Typography>
            <IconButton
                onClick={() =>
                {
                    setAddingTask(!addingTask);
                }}
                className={classes.iconButton}>
                <Add className={classes.icon} />
            </IconButton>
        </Box>
        {addingTask && <Collapse
            className={classes.transition}
            in={addingTask}>
            <ClickAwayListener onClickAway={(event) =>
            {
                setAddingTask(false);
            }} >
                <AddTaskDial status={_id}
                    close={() => setAddingTask(false)}
                    openTask={openTask}
                />
            </ClickAwayListener>
        </Collapse>
        }
        <Droppable droppableId={_id}>
            {(provided) => (<Box  {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.container} >
                {tasks.map((task) => <BoardCard
                    openTask={openTask}
                    key={task._id}
                    index={task._id}
                    data={task} />)}
                {provided.placeholder}
            </Box>)}
        </Droppable>
    </Box>
}

export default BoardColumn;