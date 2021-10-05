import { Dialog, Slide } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    fixPosition: {
        justifyContent: 'flex-end'
    },
    fixSize: {
        width: '60%',
        maxWidth: '60%',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
    }
}));

const Transition = forwardRef(function Transition(props, ref)
{
    return <Slide direction="left" ref={ref} {...props} />;
});

const DetailDialog = ({ open, onClose, children }) =>
{
    const classes = useStyles();

    return <Dialog
        classes={{ scrollPaper: classes.fixPosition, paperFullScreen: classes.fixSize }}
        fullScreen 
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}>
        {children}
    </Dialog>;
}

export default DetailDialog;