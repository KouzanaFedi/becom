import { Typography, Avatar, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { AvatarGroup } from '@material-ui/core';
import chat from '../../../assets/icons/chat.png';
import attached from '../../../assets/icons/attachment.png';
import { parseTime } from "../../../utils/timeParser";
import { useDispatch } from "react-redux";
import { SET_SELECTED_TASK } from "../../../redux/logic/projectManager/projectSlice";
import { IMAGE_ENDPOINT } from "../../../config";

const useStyle = makeStyles(() => ({
    root: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '5px',
        paddingRight: '16px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        height: '54px',
        marginBottom: '2px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.01)'
        }
    },
    title: {
        textAlign: 'start',
        fontWeight: '600',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    smallAvatar: {
        height: '32px',
        width: '32px',
    },
    whiteBorder: {
        border: '2px solid #fff !important'
    },
    icon: {
        height: '20px',
        marginRight: '10px',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconGroup: {
        display: 'flex',
        flexDirection: 'row',
        color: '#9E9E9E',
        width: '45px',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    iconLabel: {
        fontSize: '12px',
    },
    colored: ({ color }) => ({
        backgroundColor: color,
        borderBottomLeftRadius: '5px',
        borderTopLeftRadius: '5px',
        width: '5px',
        height: '100%',
        marginRight: '11px',
        transition: 'all 0.3s ease-in-out',
    }),
    lastItem: {
        textAlign: 'end'
    },
    middleItem: {
        justifyContent: 'center'
    },
    dueDate: {
        color: '#9E9E9E',
        fontSize: '14px'
    },

}));

const TaskCard = ({ openTask, color, data, serviceId }) => 
{
    const classes = useStyle({ color });
    const dispatch = useDispatch();

    return <>
        <div className={classes.root} onClick={() =>
        {
            dispatch(SET_SELECTED_TASK({ taskId: data._id, serviceId }));
            openTask();
        }}>
            <div className={classes.colored} />
            <Grid container
                direction="row"
                alignItems="center">
                <Grid item xs={6}>
                    <Typography className={classes.title}>{data.title}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.icons}>
                        < div className={classes.iconGroup}>
                            <Typography className={classes.iconLabel}>{data.attachement.length}</Typography>
                            < img className={classes.icon} src={attached} alt="icon" />
                        </div>

                        < div className={classes.iconGroup}>
                            <Typography className={classes.iconLabel}>{data.notes.length}</Typography>
                            < img className={classes.icon} src={chat} alt="icon" />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <AvatarGroup max={3} className={classes.middleItem} spacing={20} >
                        {data.members.map((member) => <Avatar
                            key={member._id}
                            classes={{ root: classes.whiteBorder }}
                            className={classes.smallAvatar}
                            alt={member.name.toUpperCase()}
                            src={member.image ? `${IMAGE_ENDPOINT}${member.image}` : null} />)}
                    </AvatarGroup>
                </Grid>
                <Grid item xs={2} className={classes.lastItem}>
                    <Typography className={classes.dueDate}>{data.dueTime !== null ? parseTime(data.dueTime) : 'Not set'}</Typography>
                </Grid>
            </Grid>
        </div>
    </>
}

export default TaskCard;