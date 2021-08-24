import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Label } from '@material-ui/icons';
import { deleteTagFromTask, addTagToTask } from '../../../../api/project';
import { useDispatch, useSelector } from "react-redux";
import { ADD_TAG_TO_TASK, availableProjectTags, DELETE_TAG_FROM_TASK } from "../../../../redux/logic/projectManager/projectSlice";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '260px',
        overflowY: 'auto'
    },
    fixBottomMargin: {
        marginBottom: '0px',
        marginLeft: '0px',
        alignItems: 'center',
    },
    labelRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: ({ color }) => ({
        color: color,
        marginLeft: '10px'
    }),
    tagLabel: {
        textTransform: 'capitalize',
        width: '100%',
        fontSize: '12px',
    },
    fullWidth: {
        width: '100%'
    }
}));

const LabelMenu = ({ usedTags, taskId, serviceId, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles();
    const availableTags = useSelector(availableProjectTags);

    return <Box className={classes.root}>
        {availableTags.map((tag) => <LabelOption
            key={tag._id}
            name={tag.title}
            value={tag._id}
            taskId={taskId}
            serviceId={serviceId}
            openBackDropOpen={openBackDropOpen}
            closeBackDropOpen={closeBackDropOpen}
            checked={usedTags.find(usedTag => usedTag._id === tag._id) !== undefined}
            color={tag.color}
        />)}
    </Box>
}

export default LabelMenu;

const LabelOption = ({ name, color, value, checked, taskId, serviceId, openBackDropOpen, closeBackDropOpen }) =>
{
    const classes = useStyles({ color });
    const dispatch = useDispatch();

    const [deleteTag] = useMutation(deleteTagFromTask, {
        onCompleted: () =>
        {
            dispatch(DELETE_TAG_FROM_TASK({ tag: value, taskId, serviceId }));
            closeBackDropOpen();
        }
    });

    const [addTag] = useMutation(addTagToTask, {
        onCompleted: () =>
        {
            dispatch(ADD_TAG_TO_TASK({ tag: value, taskId, serviceId }));
            closeBackDropOpen();
        }
    });

    return <FormControlLabel
        className={classes.fixBottomMargin}
        classes={{ label: classes.fullWidth }}
        control={<Checkbox color="primary" checked={checked} onChange={(_, check) =>
        {
            openBackDropOpen();
            if (check) addTag({ variables: { id: taskId, tag: value } });
            else deleteTag({ variables: { id: taskId, tag: value } });
        }} />}
        label={<div className={classes.labelRoot}>
            <Typography className={classes.tagLabel}>{name}</Typography>
            <Label className={classes.icon} />
        </div>}
    />
}