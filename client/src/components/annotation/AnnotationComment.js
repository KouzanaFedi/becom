import { Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Clear } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { DELETE_ANNOTATION } from "../../api/events";
import { DELETE_ANNOTATION_FROM_EVENT } from "../../redux/logic/projectManager/sharedScheduleSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
    root: {
        border: '2px solid #000',
        borderRadius: '5px',
        height: "inherit",
        overflowY: 'auto'
    },
    title: {
        fontWeight: 700,
        fontSize: '18px',
        marginBottom: '8px'
    },
    commentRoot: {
        display: 'flex',
        width: "100%",
        justifyContent: 'space-between',
        textAlign: 'start',
        '&:not(:last-child)': {
            marginBottom: '4px'
        },
        '&:hover': {
            backgroundColor: '#EFE'
        }
    },
    iconButton: {
        height: "30px",
        width: "30px",
    },
}));

const AnnotationNotes = ({ annotations, onMouseOver, onMouseOut, idEvent }) =>
{
    const classes = useStyles();

    return <Box m={2} p={2} display="flex" flexDirection="column" alignItems="center" className={classes.root}>
        <Typography className={classes.title}>
            Notes
        </Typography>
        {annotations.map((annot) =>
            <AnnotationComment
                annot={annot}
                idEvent={idEvent}
                onMouseOver={() => onMouseOver(annot.data.id)}
                onMouseOut={() => onMouseOut(annot.data.id)}
                key={annot.data.id}
            />)}
    </Box>;
}

const AnnotationComment = ({ annot, onMouseOver, onMouseOut, idEvent }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [deleteAnnotation] = useMutation(DELETE_ANNOTATION, {
        onCompleted: (_) =>
        {
            dispatch(DELETE_ANNOTATION_FROM_EVENT({ id: annot.data.id, idEvent }));
        }
    });

    return <Box px={2}
        className={classes.commentRoot}
        onMouseOver={() => onMouseOver(annot.data.id)}
        onMouseOut={() => onMouseOut(annot.data.id)}
        key={annot.data.id}>
        <li>
            {annot.data.text}
        </li>
        <IconButton size={'small'}
            className={classes.iconButton}
            onClick={() =>
            {
                deleteAnnotation({
                    variables: {
                        id: annot.data.id,
                        idEvent
                    }
                });
            }}>
            <Clear />
        </IconButton>
    </Box>
}

export default AnnotationNotes