import { useMutation } from "@apollo/client";
import { Avatar, Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useDispatch, useSelector } from "react-redux";
import { assignMemberFromTask, unassignMemberToTask } from "../../../../api/project";
import { IMAGE_ENDPOINT } from "../../../../config";
import { ASSIGN_MEMBER_TO_TASK, availableProjectMembers, UNASSIGN_MEMBER_FROM_TASK } from "../../../../redux/logic/projectManager/projectSlice";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    fixBottomMargin: {
        marginBottom: '0px',
        marginLeft: '0px'
    },
    labelRoot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: '28px',
        height: '28px',
        marginRight: '10px',
        fontSize: '12px',
        fontWeight: 700
    },
    name: {
        textTransform: 'capitalize',
        width: '100%',
        fontSize: '12px',
    }
}));

const AssignToMenu = ({ assignedMembers, taskId, serviceId, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles();
    const availableMembers = useSelector(availableProjectMembers);

    return <Box className={classes.root}>
        {availableMembers.map((item) => <AssignOption
            key={item._id}
            assignedMembers={assignedMembers}
            taskId={taskId}
            serviceId={serviceId}
            name={item.name}
            openBackDropOpen={openBackDropOpen}
            closeBackDropOpen={closeBackDropOpen}
            value={item._id}
            checked={assignedMembers.find(assignedMember => assignedMember._id === item._id) !== undefined}
            image={item.image}
        />)}
    </Box>
}

export default AssignToMenu;

const AssignOption = ({ name, image, value, checked, closeBackDropOpen, openBackDropOpen, taskId, serviceId }) =>
{
    const classes = useStyles();

    const dispatch = useDispatch();

    const [assignMember] = useMutation(assignMemberFromTask, {
        onCompleted: () =>
        {
            dispatch(ASSIGN_MEMBER_TO_TASK({ member: value, taskId, serviceId }));
            closeBackDropOpen();
        }
    });

    const [unassignMember] = useMutation(unassignMemberToTask, {
        onCompleted: () =>
        {
            dispatch(UNASSIGN_MEMBER_FROM_TASK({ member: value, taskId, serviceId }));
            closeBackDropOpen();
        }
    });

    return <FormControlLabel
        className={classes.fixBottomMargin}
        name={value}
        control={<Checkbox color="primary"
            checked={checked}
            onChange={(_, check) =>
            {
                openBackDropOpen();
                if (check) assignMember({ variables: { id: taskId, member: value } });
                else unassignMember({ variables: { id: taskId, member: value } });
            }} />
        }
        label={<div className={classes.labelRoot}>
            <Avatar className={classes.avatar} src={image ? `${IMAGE_ENDPOINT}${image}` : null} alt={name} >{name[0].toUpperCase()}</Avatar>
            <Typography className={classes.name}>{name}</Typography>
        </div>}
    />
}