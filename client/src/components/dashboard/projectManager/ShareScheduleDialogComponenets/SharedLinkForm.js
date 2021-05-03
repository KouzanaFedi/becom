import { Box, Button, ClickAwayListener, makeStyles, TextField, Tooltip, Typography, Zoom } from "@material-ui/core";
import { useState } from "react";
import { CLIENT_ADDRESS } from "../../../../config";
import { Check } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import CibleForm from "./CibleForm";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { scheduleCalendarForm, scheduleDisplayCalendarForm } from "../../../../redux/logic/projectManager/scheduleSlice";
import { useSelector } from "react-redux";

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
            lineHeight: '30px'
        },
        customCard: {
            borderColor: '#ba000d',
            backgroundColor: '#ba000d32',
            fontSize: '10px'
        },
        addUserBtn: {
            fontWeight: 'bold',
            color: 'rgba(123,33,125,1)'
        }
    }));

const SharedLinkForm = () =>
{
    const classes = useStyles();

    const [copied, setCopied] = useState(false);
    const [openToolTip, setOpenToolTip] = useState(false);
    const calendarForm = useSelector(scheduleCalendarForm);
    const displayCalendarForm = useSelector(scheduleDisplayCalendarForm);
    const link = `${CLIENT_ADDRESS}/shared_schedule?token=${(displayCalendarForm === 'edit') && calendarForm.edited.token}`

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
    return <Box pl={4} className={classes.fullHeighContainer}>
        <Box mb={4}>
            <TextField
                className={classes.marginBot}
                label="Schedule name"
                fullWidth
                variant="outlined"
                size="small"
                value={calendarForm.edited.name}
            />
        </Box>
        <Box mb={1}>
            <Typography className={classes.labels}>Shareable link</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Box className={classes.cardStyle} mr={2} >
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
        {(calendarForm.edited.cible.length === 0) &&
            <Box className={classes.cardStyle + ' ' + classes.customCard} px={1}>
                <Typography>There is no user associated with this shared calendar yet.</Typography>
            </Box>}
        {calendarForm.edited.cible.map((item, key) => { return <CibleForm key={item.id} data={item} /> })}
        <Box mt={1}>

            <Button
                size="small"
                startIcon={<AddCircleOutlineOutlined />}
                className={classes.addUserBtn}>
                Add user to schedule
                </Button>
        </Box>
    </Box >
}

export default SharedLinkForm;