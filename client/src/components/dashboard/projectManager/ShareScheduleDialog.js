import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scheduleDisplayCalendarForm, SET_DISPLAY_CALENDAR_FORM } from "../../../redux/logic/projectManager/scheduleSlice";
import RightDialComponent from "./ShareScheduleDialogComponenets/RightDialComponent";
import SharedLinks from "./ShareScheduleDialogComponenets/SharedLinks";

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: '90vh',
        maxHeight: '90vh'
    },
    dialogContent: {
        height: '70vh',
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0',
        overflowY: 'auto'
    },
    formBorder: {
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    }
}));

const ShareScheduleDialog = ({ open, onClose }) =>
{
    const classes = useStyles();
    const displayCalendarForm = useSelector(scheduleDisplayCalendarForm);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        return () =>
        {
            dispatch(SET_DISPLAY_CALENDAR_FORM({ type: null }));
        }
    }, [dispatch])

    return <Dialog
        maxWidth='md'
        fullWidth
        open={open}
        classes={{ paper: classes.dialog }}
        onEscapeKeyDown={onClose}
    >
        <Box p={2} >
            <DialogTitle style={{ paddingTop: 0 }} > Share</DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <Grid container style={{ height: '100%' }}>
                    <Grid item xs={3}>
                        <Box py={2}>
                            <SharedLinks />
                        </Box>
                    </Grid>
                    <Grid container item xs={9} justifyContent='flex-end' className={classes.formBorder}>
                        <Grid item xs={12} >
                            <Box py={2}>
                                {displayCalendarForm != null && <RightDialComponent />}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() =>
                    {
                        dispatch(SET_DISPLAY_CALENDAR_FORM({ type: null }));
                        onClose();
                    }}
                >
                    Cancel
                    </Button>
            </DialogActions>
        </Box>
    </Dialog >
}

export default ShareScheduleDialog;