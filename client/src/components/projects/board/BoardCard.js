import { Box, Divider, Grid, Paper, Typography, Avatar, Tooltip } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { AvatarGroup } from '@material-ui/core';
import chat from '../../../assets/icons/chat.png';
import attached from '../../../assets/icons/attachment.png';
import image from '../../../assets/guruguru.png'
import { useRef, useLayoutEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
const useStyles = makeStyles(() => ({
    root: {
        width: '250px',
        minHeight: '100px',
        maxHeight: '350px',
        '&:not(:last-child)': {
            marginBottom: '10px'
        }
    },
    sectionName: {
        fontSize: '10px',
        fontWeight: 700,
        backgroundColor: '#999',
        color: '#fff',
        padding: '0 15px',
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
        border: '2px solid #fff',
        width: '34px',
        height: '34px',
        fontSize: '12px',
        justifyContent: 'flex-end',
        paddingRight: '3px'
    },
    icon: {
        height: '15px',
        marginRight: '10px',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%'
    },
    iconGroup: {
        display: 'flex',
        flexDirection: 'row',
        color: '#9E9E9E',
        width: '30px',
        alignItems: 'flex-start'
    },
    iconLabel: {
        fontSize: '10px',
        fontWeight: 700
    },
    fixDisplay: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flexEnd: {
        justifyContent: 'flex-end'
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
    })
}));

const BoardCard = ({ data: { section, title, attachedFiles, notes, dueDate, assignedTo, id }, index }) =>
{
    const labels = [1, 2, 3, 4, 5, 5];
    const ref = useRef(null);
    const [dataHeight, setDataHeight] = useState(null);

    useLayoutEffect(() =>
    {
        setDataHeight(ref.current.clientHeight);
    }, []);

    const classes = useStyles({ dataHeight });

    return <Draggable draggableId={id} index={index}>
        {(provided) => (<Paper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.imageContainer}>
                    <img className={classes.image} src={image} alt='efe' />
                </Grid>
            </Grid>
            <Grid container ref={ref}>
                <Grid item xs={12} >
                    <Box px={1} pt={1} className={classes.sectionContainer}>
                        <Typography className={classes.sectionName}>
                            {section}
                        </Typography>
                        <Typography className={classes.dueDate}>
                            {dueDate}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box py={1} px={2} >
                        <Typography className={classes.cardTitle}>
                            {title}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Box p={1} className={classes.labelContainer}>
                        {labels.map((d, key) => <CardLabel key={key} text={d} />)}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={6} className={classes.fixDisplay}>
                    <Box p={1} ml={0.5}>
                        <div className={classes.icons}>
                            < div className={classes.iconGroup}>
                                <Typography className={classes.iconLabel}>{attachedFiles}</Typography>
                                < img className={classes.icon} src={attached} alt="icon" />
                            </div>

                            < div className={classes.iconGroup}>
                                <Typography className={classes.iconLabel}>{notes}</Typography>
                                < img className={classes.icon} src={chat} alt="icon" />
                            </div>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box p={1} >
                        <AvatarGroup max={2} spacing={20} className={classes.flexEnd} classes={{ avatar: classes.whiteBorder }}>
                            {assignedTo.map((assigned, key) => <Avatar key={key} alt={assigned.name} src={assigned.image} />)}
                        </AvatarGroup>
                    </Box>
                </Grid>
            </Grid>
        </Paper >)}
    </Draggable>
}

export default BoardCard;


const useStylesLabel = makeStyles(() => ({
    label: ({ color }) => ({
        backgroundColor: 'red',
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

    return <Tooltip title={`label${text}`} arrow>
        <div className={classes.label} />
    </Tooltip>
}