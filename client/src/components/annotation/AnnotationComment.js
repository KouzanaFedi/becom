import { Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    root: {
        border: '2px solid #000',
        borderRadius: '5px',
        maxHeight: '80vh',
        overflowY: 'auto'
    },
    title: {
        fontWeight: 700,
        fontSize: '18px',
        marginBottom: '8px'
    },
    commentRoot: {
        display: 'flex',
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

const AnnotationNotes = ({ annotations, onMouseOver, onMouseOut }) =>
{
    const classes = useStyles();
    return <Box m={2} pb={2} pt={1} className={classes.root}>
        <Typography className={classes.title}>
            Notes
        </Typography>
        {annotations.map((annot) =>
            <AnnotationComment
                annot={annot}
                onMouseOver={() => onMouseOver(annot.data.id)}
                onMouseOut={() => onMouseOut(annot.data.id)}
                key={annot.data.id}
            />)}
    </Box>;
}

const AnnotationComment = ({ annot, onMouseOver, onMouseOut }) =>
{
    const classes = useStyles();
    
    return <Box px={2}
        className={classes.commentRoot}
        onMouseOver={() => onMouseOver(annot.data.id)}
        onMouseOut={() => onMouseOut(annot.data.id)}
        key={annot.data.id}>
        <li>
            {annot.data.text}
        </li>
        <IconButton size={'small'} className={classes.iconButton} onClick={() => { }}>
            <Clear />
        </IconButton>
    </Box>
}

export default AnnotationNotes