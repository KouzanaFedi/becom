import { Box, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import BoardCard from "./BoardCard";
import { Add } from '@material-ui/icons';
import { Droppable } from "react-beautiful-dnd";

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
            color: '#EEE',
            cursor: 'pointer',
            backgroundColor: '#DDD'
        }
    }
}));

const BoardColumn = ({ data: { state, color, tasks, id } }) =>
{
    const classes = useStyles({ color });

    return <Box className={classes.root}>
        <Box px={1} pb={1} className={classes.header} >
            <Typography className={classes.title}>{state}</Typography>
            <Add className={classes.icon} />
        </Box>
        <Droppable droppableId={id}>
            {(provided) => (<Box  {...provided.droppableProps} ref={provided.innerRef} className={classes.container} >
                {tasks.map((d, key) => <BoardCard key={key} index={key} data={d} />)}
                {provided.placeholder}
            </Box>)}
        </Droppable>
    </Box>
}

export default BoardColumn;