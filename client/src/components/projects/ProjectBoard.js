import { useMutation } from "@apollo/client";
import { Box, Container, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../../api/project";
import { clientActiveProjectService, projectSelectedTask, projectStatusOptions, UPDATE_TASK_STATE } from "../../redux/logic/projectManager/projectSlice";
import ThemedBackDrop from "../themedComponents/ThemedBackDrop";
import BoardColumn from "./board/BoardColumn";
import DetailDialog from "./tasks/DetailDialog";
import TaskDetail from "./tasks/TaskDetail";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
    },
    container: {
        display: 'flex',
        height: `calc(100vh - (40px + ${theme.spacing(2)}))`,
        paddingBottom: '40px'
    },
    overflow: {
        overflowX: 'auto',
        overflowY: 'hidden',
    }
}));

const ProjectBoard = () =>
{
    const serviceData = useSelector(clientActiveProjectService);
    const availableStatus = useSelector(projectStatusOptions);

    const dispatch = useDispatch();

    const [openTaskDial, setOpenTaskDial] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);

    const selectedTask = useSelector(projectSelectedTask);
    const [updatedStatusData, setUpdatedStatusData] = useState({});
    const [selectedTaskData, setSelectedTaskData] = useState({});

    const [boardData, setBoardData] = useState([]);

    useEffect(() =>
    {
        if (selectedTask) {
            const serviceId = serviceData.findIndex((service) => service._id === selectedTask.serviceId);
            if (serviceId >= 0) {
                const task = serviceData[serviceId]?.tasks.find((task) => task._id === selectedTask.taskId);
                const taskData = { ...task };
                taskData['serviceName'] = serviceData[serviceId]?.title;
                taskData['serviceId'] = selectedTask.serviceId;
                setSelectedTaskData(taskData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTask, serviceData]);

    useEffect(() =>
    {
        const tmp = [];
        availableStatus.forEach((status) =>
        {
            const statusObj = { ...status, tasks: [] };
            tmp.push(statusObj);
        });

        serviceData.forEach((service) =>
        {
            const serviceObj = { service: service.title, serviceId: service._id };
            service.tasks.forEach((task) =>
            {
                const statusIndex = tmp.findIndex((t) => t._id === task.status._id);
                tmp[statusIndex].tasks.push({ ...task, ...serviceObj });
            });
        });

        setBoardData(tmp);

    }, [serviceData, availableStatus])

    const [updateStatus] = useMutation(updateTaskStatus, {
        onCompleted: () =>
        {
            dispatch(UPDATE_TASK_STATE({ ids: updatedStatusData.draggableObj, newStatusId: updatedStatusData.destinationId }));
        }
    });

    function handleDragEnd(result)
    {
        if (!result.destination) return;
        const sourceId = result.source.droppableId;
        const destinationId = result.destination.droppableId;
        const draggableObj = JSON.parse(result.draggableId);

        setUpdatedStatusData({ draggableObj, destinationId });

        if (sourceId !== destinationId) {
            updateStatus({ variables: { taskId: draggableObj.taskId, statusId: destinationId } });
        }
    }

    function handleTaskOpen()
    {
        setOpenTaskDial(true);
    }


    const classes = useStyles();
    return <Grid item xs={10} className={classes.root}>
        <Box mt={2}>
            <DragDropContext className={classes.overflow} onDragEnd={handleDragEnd}>
                <Container className={classes.container}>
                    {boardData.map((data) => <BoardColumn
                        openTask={handleTaskOpen}
                        key={data._id}
                        data={data} />)}
                </Container>
            </DragDropContext>
        </Box>
        {selectedTask !== null && <DetailDialog open={openTaskDial} onClose={() => { setOpenTaskDial(false) }}>
            <TaskDetail
                openBackDropOpen={() => setBackDropOpen(true)}
                closeBackDropOpen={() => setBackDropOpen(false)}
                data={selectedTaskData}
            />
        </DetailDialog>}
        <ThemedBackDrop backDropOpen={backDropOpen} />
    </Grid >
}
export default ProjectBoard;