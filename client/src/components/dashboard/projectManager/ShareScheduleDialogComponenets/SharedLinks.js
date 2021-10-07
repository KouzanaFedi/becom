import { useQuery } from "@apollo/client";
import { Box, IconButton, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Add, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SHARED_LINKS_BY_PROJECTID } from "../../../../api/events";
import { INIT_SHARED_LINKS, scheduleSharedLinks } from "../../../../redux/logic/projectManager/scheduleSlice";
import ThemedButton from "../../../themedComponents/ThemedButton";

const useStyles = makeStyles(() => (
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
            width: "100%"
        },
        title: {
            fontWeight: 'bold'
        },
        topDivider: {
            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        },
        editBtn: {
            minWidth: '24px',
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

const SharedLinks = ({ project, setEdit, setCreate, setScheduleShareData }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const sharedLinksData = useSelector(scheduleSharedLinks);

    useQuery(SHARED_LINKS_BY_PROJECTID, {
        variables: { projectId: project.id },
        onCompleted: ({ getSharedSchedulesByProjecId }) =>
        {
            dispatch(INIT_SHARED_LINKS({ sharedLink: getSharedSchedulesByProjecId }));
        }
    });

    return <Box display="flex" flexDirection="column" alignItems="center" rowGap="15px">
        <ThemedButton
            variant="outlined"
            buttonStyle={{ type: 'primary' }}
            fullWidth={false}
            startIcon={<Add />}
            onClick={() =>
            {
                setCreate();
                setScheduleShareData({ _id: "", name: "", start: `${new Date().getTime()}`, end: `${new Date().getTime()}`, projectId: project.id, cible: [] });
            }}>
            Create sharing link
        </ThemedButton>
        {sharedLinksData.map((item) =>
        {
            return <Box key={item._id} px={1} className={classes.sharedLinksDataButton}>
                <Typography>
                    {item.name}
                </Typography>
                <IconButton
                    size='small'
                    className={classes.editBtn}
                    onClick={() =>
                    {
                        setEdit("edit");
                        const cibleEditMode = { ...item, cible: [] };
                        item.cible.forEach((it) =>
                        {
                            cibleEditMode.cible.push({ ...it, edit: true });
                        });
                        setScheduleShareData(cibleEditMode);
                    }}>
                    <Edit />
                </IconButton>
            </Box>
        })}
    </Box>
}

export default SharedLinks;