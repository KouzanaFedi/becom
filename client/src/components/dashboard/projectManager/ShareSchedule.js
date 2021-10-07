import { Box, Breadcrumbs, Grid, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import {  useState } from "react";
import DisplaySharedLink from "./ShareScheduleDialogComponenets/DisplaySharedLink";
import SharedLinks from "./ShareScheduleDialogComponenets/SharedLinks";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        height: '70vh',
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0',
        overflowY: 'auto'
    },
    header: {
        width: "100%",
    },
    title: {
        color: '#000',
        fontWeight: 700,
        fontSize: '18px'
    },
    menu: {
        width: "100%",
        height: 'calc(100vh - 68px)',
        borderRight: "1px solid #CCC"
    }
}));

const ShareSchedule = ({ openBackDropOpen, closeBackDropOpen, project }) =>
{
    const classes = useStyles();
    const [mode, setMode] = useState(null);
    const [scheduleShareData, setScheduleShareData] = useState(null);

    return <Grid container >
        <Grid item xs={12} >
            <Box p={2} className={classes.header} display="flex" justifyContent="space-between" alignItems="center">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Typography >{project.title} </Typography>
                    <Typography className={classes.title}> Share calendar</Typography>
                </Breadcrumbs>
            </Box>
        </Grid>

        <Grid item xs={3}>
            <Box p={2} className={classes.menu}>
                <SharedLinks
                    setScheduleShareData={(data) => setScheduleShareData(data)}
                    project={project}
                    setCreate={() => setMode('create')}
                    setEdit={() => setMode('edit')} />
            </Box>
        </Grid>
        <Grid container item xs={9}>
            <Grid item xs={12} >
                <Box p={2} pt={0}>
                    {mode && <DisplaySharedLink
                        openBackDropOpen={openBackDropOpen}
                        closeBackDropOpen={closeBackDropOpen}
                        setMode={(m) => setMode(m)}
                        setScheduleShareData={(data) => setScheduleShareData(data)}
                        mode={mode}
                        data={scheduleShareData} />}
                </Box>
            </Grid>
        </Grid>

    </Grid>
}

export default ShareSchedule;