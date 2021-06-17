import { useMutation, useQuery } from "@apollo/client";
import { Container, makeStyles, Paper, Button, Box } from "@material-ui/core"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from 'react-trello';
import { PROJECT_INFO, TASK_TYPES, TASK_UPDATE_STATE } from "../api/project";
import { boardData, INIT_BOARD, UPDATE_CARD_STATE, INIT_TASK_TYPES_OPTIONS } from "../redux/logic/projectManager/kanbanBoardSlice";
import CreateTaskDial from "./kanban/CreateTaskDial";
import ThemedButton from "./themedComponents/ThemedButton";
import ThemedTextField from "./themedComponents/ThemedTextField";

// import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    addButton: {
        backgroundColor: '#e3e3e3',

    }

}));

const KanbanBoard = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const storedData = useSelector(boardData);
    const data = JSON.parse(JSON.stringify(storedData));
    const [openCreate, setOpenCreate] = useState(false);

    useQuery(PROJECT_INFO, {
        variables: { projectId: "609130ce3dc0a3080b519945" },
        onCompleted: ({ getTasksByProject },) =>
        {
            dispatch(INIT_BOARD({ data: getTasksByProject }));
        }
    });

    const [updateCardState] = useMutation(TASK_UPDATE_STATE, {
        onCompleted: ({ updateTaskState }) =>
        {
            const { id, toState, fromState } = updateTaskState;
            dispatch(UPDATE_CARD_STATE({ id, toState, fromState }));
        }
    });

    useQuery(TASK_TYPES, {
        onCompleted: ({ getActiveTaskTypes }) =>
        {
            dispatch(INIT_TASK_TYPES_OPTIONS({ taskTypes: getActiveTaskTypes }));
        }
    });

    return <Container maxWidth="lg" className={classes.container}>
        <CreateTaskDial
            open={openCreate}
            onClose={() =>
            {
                setOpenCreate(false);
            }} />
        <Paper className={classes.paper}>
            <Box py={2}>
                <Button
                    className={classes.addButton}
                    onClick={() =>
                    {
                        setOpenCreate(true);
                    }}>
                    Add Task
                </Button>
                <ThemedButton
                    onClick={() => { console.log("it works"); }}
                    buttonStyle={{ type: "primary" }}>Register </ThemedButton>

                <Board
                    data={data}
                    cardDraggable={true}
                    laneDraggable={false}
                    hideCardDeleteIcon={true}
                    style={{ background: 'transparent' }}
                    handleDragEnd={(cardId, sourceLaneId, targetLaneId, r, rr) =>
                    {
                        if (sourceLaneId !== targetLaneId) {
                            updateCardState({
                                variables: {
                                    taskId: cardId,
                                    state: targetLaneId,
                                    oldState: sourceLaneId
                                }
                            });
                        }
                    }}
                />
            </Box >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ThemedTextField borderRadius="5px 5px 0 0" />
                <ThemedTextField borderRadius="0" />
                <ThemedTextField borderRadius=" 0 0 5px 5px" />
            </div>
        </Paper>
    </Container>
}

export default KanbanBoard;