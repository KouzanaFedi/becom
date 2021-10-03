import { Box, Container, Grid, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMAGE_ENDPOINT } from "../../config";
import { clientActiveProjectService } from "../../redux/logic/projectManager/projectSlice";
import FileCard, { FileHeader } from "./files/FileCard";

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
        overflowY: 'auto'
    },
    service: {
        fontWeight: 700,
        textAlign: 'start',
        fontSize: '18px',
        textTransform: 'capitalize',
    },
    task: {
        fontWeight: 700,
        textAlign: 'start',
        textTransform: 'capitalize',
        color: "#666",
        marginBottom: '10px'
    }
}));

const ProjectFiles = () =>
{
    const classes = useStyles();
    const services = useSelector(clientActiveProjectService);

    const [filesArray, setFilesArray] = useState([]);

    useEffect(() =>
    {
        const tmp = [];

        services.forEach((service) =>
        {
            const serviceObj = { service: service.title, id: service._id, tasks: [] };
            service.tasks.forEach((task) => serviceObj.tasks.push({ title: task.title, id: task._id, files: [...task.attachement] }));
            tmp.push(serviceObj);
        });

        setFilesArray(tmp);
    }, [services]);

    return <Grid item xs={10} className={classes.root}>
        <Box my={2}>
            <Container>
                {filesArray.map((fileArray) => <Box ml={2} mb={2} key={fileArray.id}>
                    <Typography className={classes.service} >{fileArray.service}</Typography>
                    {fileArray.tasks.map((task) => task.files.length > 0 && <Box key={task.id} ml={2} mt={1}>
                        <Typography className={classes.task}>{task.title}</Typography>
                        <Box ml={2} mb={3}>
                            <FileHeader />
                            {task.files.map((file) => <FileCard
                                key={file._id}
                                name={file.src.split('/').pop()}
                                size={file.size}
                                addedBy={file.addedBy.name}
                                addDate={file.createdAt}
                                fileLink={`${IMAGE_ENDPOINT}${file.src}`}
                            />)}
                        </Box>
                    </Box>)}
                </Box>)}
            </Container>
        </Box>
    </Grid >
}

export default ProjectFiles;