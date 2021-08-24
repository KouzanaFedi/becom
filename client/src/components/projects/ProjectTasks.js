import { Container, Grid, Box } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from "react";
import DetailDialog from "./tasks/DetailDialog";
import TaskDetail from "./tasks/TaskDetail";
import SectionDetail from "./tasks/SectionDetail";
import TaskGroup from "./tasks/TaskSection";
import { useSelector } from "react-redux";
import { clientActiveProjectService, projectSelectedTask, projectStatusOptions } from "../../redux/logic/projectManager/projectSlice";

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
        overflowY: 'auto'
    }
}));

const ProjectTasks = () =>
{
    const stats = [{ name: 'TODOS', value: 24, color: 'blue', type: 'Tasks' },
    { name: 'DOINGS', value: 24, color: 'red', type: 'Tasks' }, { name: 'DONE', value: 24, color: 'green', type: 'Tasks' },
    { name: 'REVIEW', value: 24, color: 'orange', type: 'Tasks' }];

    const classes = useStyles();
    const [openTaskGroupDial, setOpenTaskGroupDial] = useState(false);
    const [openTaskDial, setOpenTaskDial] = useState(false);

    const [projectData, setProjectData] = useState([]);

    const selectedTask = useSelector(projectSelectedTask);
    const [selectedTaskData, setSelectedTaskData] = useState({});
    const [selectedServiceData, setSelectedServiceData] = useState({});


    const services = useSelector(clientActiveProjectService);
    const statusOptions = useSelector(projectStatusOptions);

    function handleTaskGroupOpen()
    {
        setOpenTaskGroupDial(true);
    }

    function handleTaskOpen()
    {
        setOpenTaskDial(true);
    }

    useEffect(() =>
    {
        const servicesData = [];
        services.forEach(service =>
        {
            const { _id, title, description, dueTime, createdAt, tasks } = service;
            const serviceObj = { _id, title, description, dueTime, createdAt, tasksByStatus: [] };

            statusOptions.forEach((status) =>
            {
                const { _id, type, title, color } = status;
                const statusObj = { _id, type, title, color, tasks: [] };
                serviceObj.tasksByStatus.push(statusObj);
            });

            tasks.forEach((task) =>
            {
                const tasksByStatusIndex = serviceObj.tasksByStatus.findIndex(taskByStatus => taskByStatus._id === task.status._id);
                const tmp = { ...task }
                delete tmp.status;
                serviceObj.tasksByStatus[tasksByStatusIndex].tasks.push(tmp);
            });
            servicesData.push(serviceObj);
        });

        setProjectData(servicesData);

    }, [services, statusOptions]);

    useEffect(() =>
    {
        if (selectedTask) {
            const serviceId = services.findIndex((service) => service._id === selectedTask.serviceId);
            const task = services[serviceId].tasks.find((task) => task._id === selectedTask.taskId);
            const taskData = { ...task };
            taskData['serviceName'] = services[serviceId].title;
            taskData['serviceId'] = selectedTask.serviceId;
            setSelectedTaskData(taskData);

            setSelectedServiceData(services.find((service) => service._id === selectedTask.serviceId));
        }
    }, [selectedTask, services])

    return <>
        <Grid item xs={10} className={classes.root}>
            <Box my={2}>
                <Container >
                    {projectData.map((service) => <TaskGroup
                        key={service._id}
                        serviceId={service._id}
                        openTaskGroup={handleTaskGroupOpen}
                        openTask={handleTaskOpen}
                        title={service.title}
                        tasks={service.tasksByStatus} />)}
                </Container>
            </Box>
        </Grid>
        <DetailDialog open={openTaskGroupDial} onClose={() => { setOpenTaskGroupDial(false) }}>
            <SectionDetail stats={stats} data={selectedServiceData} />
        </DetailDialog>
        {selectedTask !== null && <DetailDialog open={openTaskDial} onClose={() => { setOpenTaskDial(false) }}>
            <TaskDetail data={selectedTaskData} />
        </DetailDialog>}
    </>
}

export default ProjectTasks;