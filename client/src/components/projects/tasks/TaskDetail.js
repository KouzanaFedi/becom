import { Avatar, Box, Breadcrumbs, Button, Chip, Grid, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { Event, PersonAdd, Attachment, Label, People, Comment, Timeline } from '@material-ui/icons';
import NoteFeed from './taskDetail/NoteFeed';
import AppBarMenuButton from './taskDetail/AppBarMenuButton';
import AssignToMenu from './taskDetail/AssignToMenu';
import DueDateOption from './taskDetail/DueDateOption';
import FileTable from './taskDetail/FileTable';
import LabelMenu from './taskDetail/LabelMenu';
import NoteSender from './taskDetail/NoteSender';
import { parseTime } from '../../../utils/timeParser';
import { IMAGE_ENDPOINT } from '../../../config';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AddAttachementToTask } from '../../../api/project';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../redux/logic/userSlice';
import { ADD_ATTACHEMENT_TO_TASK, clientsActiveProject } from '../../../redux/logic/projectManager/projectSlice';
import Color from 'color';
import DescriptionSection from './taskDetail/DescriptionSection';

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
    fixMargin: {
        marginTop: '40px'
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
    space: {
        marginBottom: '15px',
        display: 'none'
    },
    uploadBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelButton: {
        marginBottom: '0px',
        marginRight: '15px'
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '5px',
        flexWrap: 'wrap',
        gap: '5px'
    },
    chip: ({ color }) => ({
        backgroundColor: Color(color).alpha(.4).toString(),
        color: color,
        textTransform: 'uppercase',
        fontWeight: 800,
        fontSize: '11px',
        height: '24px'
    }),
    assignToEl: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        width: '50%'
    },
    assignToContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '5px'
    },
    assignToName: {
        fontSize: '14px',
        marginLeft: '16px',
        textTransform: 'capitalize'
    },
    avatar: {
        height: '34px',
        width: '34px'
    },
    semiBold: {
        fontWeight: 600
    }
}));

const TaskDetail = ({ data, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles();
    const [notesArray, setNotesArray] = useState([]);


    const dispatch = useDispatch();

    const acceptedFiles = ["image/*", " text/csv", " text/plain", " application/json", " application/pdf", " application/vnd.ms-powerpoint", " application/vnd.openxmlformats-officedocument.presentationml.presentation", " font/ttf", " application/vnd.ms-excel", " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    const user = useSelector(userData);
    const currentProject = useSelector(clientsActiveProject);

    const [sendAttachement] = useMutation(AddAttachementToTask, {
        onCompleted: ({ sendAttachementToTask }) =>
        {
            const { _id, src, createdAt, size } = sendAttachementToTask;
            const addedBy = {
                email: user.email,
                image: user.image,
                name: user.name,
                _id: user.id
            };
            dispatch(ADD_ATTACHEMENT_TO_TASK({ addedBy, createdAt, size, src, _id, taskId: data._id, serviceId: data.serviceId }));
            closeBackDropOpen();
        }
    });

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
                    taskId={data._id}
                    serviceId={data.serviceId}
                    openBackDropOpen={openBackDropOpen}
                    closeBackDropOpen={closeBackDropOpen}
                    taskDueTime={data.dueTime}
                />}
            />
            <AppBarMenuButton
                buttonContent={<div className={classes.iconGroup}>
                    <PersonAdd className={classes.icon} />
                    <Typography className={classes.btnTitle}>Assign</Typography>
                </div>}
                menuContent={<AssignToMenu
                    assignedMembers={data.members}
                    taskId={data._id}
                    serviceId={data.serviceId}
                    openBackDropOpen={openBackDropOpen}
                    closeBackDropOpen={closeBackDropOpen}
                />}
            />
            <AppBarMenuButton
                buttonContent={<div className={classes.iconGroup}>
                    <Label className={classes.icon} />
                    <Typography className={classes.btnTitle}>Label</Typography>
                </div>}
                menuContent={<LabelMenu
                    usedTags={data.tags}
                    taskId={data._id}
                    serviceId={data.serviceId}
                    openBackDropOpen={openBackDropOpen}
                    closeBackDropOpen={closeBackDropOpen}
                />}
            />
            <div className={classes.uploadBtn}>
                <input
                    accept={acceptedFiles.join(',')}
                    className={classes.space}
                    id="contained-button-file"
                    type="file"
                    onChange={({ target }) =>
                    {
                        openBackDropOpen();
                        const file = target.files[0];
                        sendAttachement({ variables: { file, addedBy: user.id, taskId: data._id, projectTitle: currentProject.title } });
                    }} />
                <label className={classes.labelButton} htmlFor="contained-button-file">
                    <Button className={classes.iconGroup} component="span">
                        <Attachment className={classes.icon} />
                        <Typography className={classes.btnTitle}>Attachment</Typography>
                    </Button>
                </label>
            </div >
        </Grid>
        <Grid item xs={12} className={classes.fixMargin}>
            <Box p={2}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Typography > {data.serviceName} </Typography>
                    <Typography className={classes.title}> {data.title} </Typography>
                </Breadcrumbs>
            </Box>
        </Grid>
        <Grid item xs={8}>
            <DescriptionSection
                serviceId={data.serviceId}
                taskId={data._id}
                openBackDropOpen={openBackDropOpen}
                closeBackDropOpen={closeBackDropOpen}
                description={data.description} />
        </Grid>
        <Grid item xs={4}>
            <Box p={2}>
                <Typography className={classes.label}>Due time</Typography>
                <Typography className={classes.content} > {data.dueTime ? parseTime(data.dueTime) : 'not set'} </Typography>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Label />
                    </Box>
                    <Typography className={classes.semiBold}>Labels</Typography>
                </div>
                <Box my={1} className={classes.chipContainer}>
                    {data.tags.length > 0 ? data.tags.map((tag) => <LabelChip key={tag._id} name={tag.title} color={tag.color} />) : 'Add tags'}
                </Box>
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <People />
                    </Box>
                    <Typography className={classes.semiBold}>Members</Typography>
                </div>
                <Box my={1} className={classes.assignToContainer}>
                    {data.members.length > 0 ? data.members.map((member) => <AssignedToEl key={member._id} image={member.image ? `${IMAGE_ENDPOINT}${member.image}` : null} name={member.name} />) : 'Assign members'}
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Attachment />
                    </Box>
                    <Typography className={classes.semiBold}>Attachments</Typography>
                </div>
                {data.attachement.length > 0 ? <FileTable taskId={data._id} data={data.attachement} serviceId={data.serviceId} coverImage={data.coverImage} /> : "Upload attachements"}
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Comment />
                    </Box>
                    <Typography className={classes.semiBold}>Send note</Typography>
                </div>
                <NoteSender taskId={data._id} serviceId={data.serviceId} />
            </Box>
        </Grid>
        {notesArray.length > 0 && <Grid item xs={12}>
            <Box p={2}>
                <div className={classes.iconGroup + ' ' + classes.label}>
                    <Box mr={1}>
                        <Timeline />
                    </Box>
                    <Typography className={classes.semiBold}>Notes</Typography>
                </div>
                {notesArray.map((note) => <NoteFeed key={note._id} data={note} />)}
            </Box>
        </Grid>}
    </Grid>
}

export default TaskDetail;

const LabelChip = ({ name, color }) =>
{
    const classes = useStyles({ color });
    return <Chip className={classes.chip} label={name} />;
};

const AssignedToEl = ({ name, image }) =>
{
    const classes = useStyles();
    return <div className={classes.assignToEl}>
        <Avatar className={classes.avatar} alt={name} src={image} />
        <Typography className={classes.assignToName}>{name}</Typography>
    </div>
};