import { Box, Button, CircularProgress, ClickAwayListener, Grid, makeStyles, Tooltip, Typography, Zoom } from "@material-ui/core";
import { useState } from "react";
import { CLIENT_ADDRESS } from "../../../../config";
import { Check } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import CibleForm from "./CibleForm";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { DELETE_SCHEDULE_LINK, scheduleCalendarForm } from "../../../../redux/logic/projectManager/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { DELETE_SHARED_LINK } from "../../../../api/events";

const useStyles = makeStyles((theme) => (
    {
        labels: {
            color: 'grey',
            fontWeight: 'bold'
        },
        cardStyle: {
            width: '100%',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            height: '30px',
            padding: '0 14px',
            lineHeight: '30px',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                width: 0,
                height: 0
            }
        },
        customCard: {
            borderColor: '#ba000d',
            backgroundColor: '#ba000d32',
            fontSize: '10px'
        },
        addUserBtn: {
            fontWeight: 'bold',
            color: 'rgba(123,33,125,1)'
        },
        titles: {
            fontWeight: 'bold',

        }
    }));

const DisplaySharedLink = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [copied, setCopied] = useState(false);
    const [openToolTip, setOpenToolTip] = useState(false);
    const calendarForm = useSelector(scheduleCalendarForm);
    const link = `${CLIENT_ADDRESS}/shared_schedule/${calendarForm.edited.token}`;

    const copiedStyle = copied ? {
        color: '#3CA374',
        borderColor: '#3CA374',
        fontWeight: 'bold',
        backgroundColor: '#3CA37432',
    } : {};

    const handleTooltipClose = () =>
    {
        setOpenToolTip(false);
    };

    const handleTooltipOpen = () =>
    {
        setOpenToolTip(true);
    };

    const [deleteShared, { loading }] = useMutation(DELETE_SHARED_LINK, {
        variables: {
            id: calendarForm.edited.id
        }, onCompleted: (_) => { 
           dispatch(DELETE_SCHEDULE_LINK({id:calendarForm.edited.id})) ;
        }
    });
    return <div>
        <Box mb={4}>
            <Typography className={classes.labels}>Schedule name</Typography>
            <Box className={classes.cardStyle} mr={2}>
                {calendarForm.edited.name}
            </Box>
        </Box>
        <Box mb={1}>
            <Typography className={classes.labels}>Shareable link</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Box className={classes.cardStyle} mr={2}>
                {link}
            </Box>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    arrow
                    title="Copied !"
                    onClose={handleTooltipClose}
                    open={openToolTip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    leaveTouchDelay={200}
                    placement="top-end"
                    TransitionComponent={Zoom}>
                    <CopyToClipboard text={link} onCopy={(_, res) =>
                    {
                        if (res) {
                            setCopied(true);
                            handleTooltipOpen()
                        }
                    }}>
                        <Button
                            variant="outlined"
                            style={copiedStyle}
                            size="small"
                        >
                            {!copied ? "Copy" : <Check />}
                        </Button>
                    </CopyToClipboard>
                </Tooltip>
            </ClickAwayListener>
        </Box>
        <Box my={1}>
            <Typography className={classes.labels}>Users</Typography>
        </Box>
        {(calendarForm.edited.cible.length === 0) ?
            <Box className={classes.cardStyle + " " + classes.customCard} px={1}>
                <Typography>There is no user associated with this shared calendar yet.</Typography>
            </Box> :
            <Box display='flex' alignItems='center'>
                <Grid container spacing={1} >
                    <Grid item xs={6} className={classes.titles}>
                        Email
                    </Grid>
                    <Grid item xs={3} className={classes.titles}>
                        First name
                    </Grid>
                    <Grid item xs={3} className={classes.titles}>
                        Last Name
                    </Grid>
                </Grid>
                <Box ml={1}>
                    <div style={{ width: '30px' }} />
                </Box>
            </Box>}
        {calendarForm.edited.cible.map((item) =>
        {
            return <CibleForm
                key={item.id}
                data={item}
                type={'edit'}
                sharedLink={calendarForm.edited.id} />
        })}
        <Box mt={1}>

            <Button
                size="small"
                startIcon={<AddCircleOutlineOutlined />}
                className={classes.addUserBtn}>
                Add user to schedule
                </Button>
        </Box>

        <Button
            variant="contained"
            color="delete"
            style={{
                color: 'white',
                backgroundColor: 'red',
                marginTop: '10px',
            }}
            onClick={() =>
            {
                deleteShared();
            }}
        >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
    </div >
}

export default DisplaySharedLink;