import { useQuery } from "@apollo/client";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SHARED_LINKS_BY_PROJECTID } from "../../../../api/events";
import { INIT_SHARED_LINKS, scheduleSharedLinks, SET_DISPLAY_CALENDAR_FORM } from "../../../../redux/logic/projectManager/scheduleSlice";

const useStyles = makeStyles((theme) => (
    {
        addButtonDisplay: {
            display: 'flex',
        },
        addButton: {
            margin: '24px 0',
            backgroundColor: 'rgba(123,33,125,1)',
            color: 'white',
            fontSize: '12',
            '&:hover': {
                backgroundColor: 'rgba(223,49,69,1)',
            }
        },
        sharedLinksDataButton: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
        },
        title: {
            fontWeight: 'bold'
        },
        topDivider: {
            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        },
        editBtn: {
            minWidth: '24px',
            border: '0.5px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            color: 'rgba(123, 33, 125, 1)'
        },
        editBtnClicked: {
            minWidth: '24px',
            borderRadius: '4px',
            color: 'white',
            backgroundColor: 'rgba(123, 33, 125, 1)',
            '&:hover': {
                backgroundColor: 'rgba(123, 33, 125, .87)',

            }
        }
    }));

const SharedLinks = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const sharedLinksData = useSelector(scheduleSharedLinks);

    useQuery(SHARED_LINKS_BY_PROJECTID, {
        variables: { projectId: "607d496a031c940568bab463" },
        onCompleted: ({ getSharedSchedulesByProjecId }) =>
        {
            dispatch(INIT_SHARED_LINKS({ sharedLink: getSharedSchedulesByProjecId }));
        }
    });

    return <Box >
        <Box mx={2}>
            <Typography className={classes.title}>Shared calendars</Typography>
            <Button
                className={classes.addButton}
                startIcon={<Add />}
                onClick={() =>
                {
                    dispatch(SET_DISPLAY_CALENDAR_FORM({ type: 'create' }));
                }}>
                Add a shared Calendar
        </Button>
        </Box>
        <Box p={2} className={classes.topDivider}>
            {sharedLinksData.map((item) =>
            {
                return <Box key={item.id} className={classes.sharedLinksDataButton}>
                    <Typography>
                        {item.name}
                    </Typography>
                    <Button
                        size='small'
                        className={classes.editBtn}
                        onClick={() =>
                        {
                            dispatch(SET_DISPLAY_CALENDAR_FORM({ type: 'edit', data: item }));
                        }}>
                        <Edit />
                    </Button>
                </Box>
            })}
        </Box>
    </Box>
}

export default SharedLinks;