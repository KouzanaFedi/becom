import { Box, Divider, Grid, Paper, Typography, Avatar, Tooltip } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { AvatarGroup } from '@material-ui/core';
import chat from '../../../assets/icons/chat.png';
import attached from '../../../assets/icons/attachment.png';
import { useRef, useLayoutEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { parseTime } from "../../../utils/timeParser";
import { IMAGE_ENDPOINT } from "../../../config";
import { DragIndicator } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { SET_SELECTED_TASK } from "../../../redux/logic/projectManager/projectSlice";
const useStyles = makeStyles(() => ({
    root: {
        width: '250px',
        minHeight: '100px',
        maxHeight: '350px',
        cursor: 'pointer',
        '&:not(:last-child)': {
            marginBottom: '10px'
        }
    },
    sectionName: {
        fontSize: '10px',
        fontWeight: 700,
        backgroundColor: '#999',
        color: '#fff',
        padding: '5px 15px',
        display: 'flex',
        borderRadius: '24px',
        lineHeight: '5px',
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    sectionContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontSize: '14px',
        textAlign: 'start',
        fontWeight: 600
    },
    dueDate: {
        fontSize: '10px',
        display: 'inline-block',
        fontWeight: 700,
        color: '#999',
        backgroundColor: '#EFE',
        padding: '0 15px',
        borderRadius: '24px'
    },
    label: {
        backgroundColor: 'red',
        margin: '1px'
    },
    labelContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    whiteBorder: {
        border: '2px solid #fff !important',
    },
    icon: {
        height: '15px',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '10px',
        height: '100%'
    },
    iconGroup: {
        display: 'flex',
        flexDirection: 'row',
        color: '#9E9E9E',
        gap: '5px',
        alignItems: 'flex-start'
    },
    iconLabel: {
        fontSize: '10px',
        fontWeight: 700
    },
    fixDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        objectFit: 'scale-down',
        overflow: 'hidden'
    },
    imageContainer: ({ dataHeight }) => ({
        maxHeight: `${350 - dataHeight}px`,
        height: 'auto',
        display: 'flex',
        justifyContent: 'center'
    }),
    smallAvatar: {
        height: '28px',
        width: '28px',
        fontSize: '14px',
        fontWeight: 700
    },
    dragIcon: {
        display: 'flex'
    }
}));

const BoardCard = ({ data: { service, title, attachement, notes, dueTime, members, _id, serviceId, tags, coverImage }, index, openTask }) =>
{
    const ref = useRef(null);
    const [dataHeight, setDataHeight] = useState(null);
    const dispatch = useDispatch();

    useLayoutEffect(() =>
    {
        setDataHeight(ref.current.clientHeight);
    }, []);

    const classes = useStyles({ dataHeight });

    return <Draggable draggableId={JSON.stringify({ taskId: _id, serviceId })} index={parseInt(index)}>
        {(provided) => (<Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() =>
            {
                dispatch(SET_SELECTED_TASK({ serviceId, taskId: _id }));
                openTask();
            }}
            className={classes.root}>
            {coverImage && <Grid container>
                <Grid item xs={12} className={classes.imageContainer}>
                    <img className={classes.image} src={coverImage ? `${IMAGE_ENDPOINT}${coverImage}` : null} alt='coverImage' />
                </Grid>
            </Grid>}
            <Grid container ref={ref}>
                <Grid item xs={12} >
                    <Box px={1} pt={1} className={classes.sectionContainer}>
                        <Typography className={classes.sectionName}>
                            {service}
                        </Typography>
                        {dueTime && <Typography className={classes.dueDate}>
                            {parseTime(dueTime)}
                        </Typography>}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box py={1} px={2} >
                        <Typography className={classes.cardTitle}>
                            {title}
                        </Typography>
                    </Box>
                </Grid>
                {tags.length > 0 && <>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box p={1} className={classes.labelContainer}>
                            {tags.map((tag) => <CardLabel key={tag._id} text={tag.title} color={tag.color} />)}
                        </Box>
                    </Grid></>}
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} className={classes.fixDisplay}>
                    <Box p={1} ml={0.5}>
                        <div className={classes.icons}>
                            < div className={classes.iconGroup}>
                                <Typography className={classes.iconLabel}>{attachement.length}</Typography>
                                < img className={classes.icon} src={attached} alt="icon" />
                            </div>

                            < div className={classes.iconGroup}>
                                <Typography className={classes.iconLabel}>{notes.length}</Typography>
                                < img className={classes.icon} src={chat} alt="icon" />
                            </div>
                        </div>
                    </Box>
                    <Box py={0.5} >
                        <AvatarGroup max={2} spacing={20} classes={{ avatar: classes.whiteBorder }}>
                            {members.map((member) => <Avatar
                                className={classes.smallAvatar}
                                key={member._id}
                                alt={member.name}
                                src={member.image ? `${IMAGE_ENDPOINT}${member.image}` : null} >
                                {member.name[0].toUpperCase()}
                            </Avatar>)}
                        </AvatarGroup>
                    </Box>
                    <Box mr={1} className={classes.dragIcon} {...provided.dragHandleProps}>
                        <DragIndicator />
                    </Box>
                </Grid>
            </Grid>
        </Paper >)}
    </Draggable>
}

export default BoardCard;


const useStylesLabel = makeStyles(() => ({
    label: ({ color }) => ({
        backgroundColor: color,
        borderRadius: '10px',
        color: '#fff',
        width: '50px',
        height: '5px',
        margin: '2px',
    }),
    labelContainer: {
        display: 'flex',
    }
}));

export const CardLabel = ({ text, color }) =>
{
    const classes = useStylesLabel({ color });

    return <Tooltip title={text.toUpperCase()} arrow>
        <div className={classes.label} />
    </Tooltip>
}