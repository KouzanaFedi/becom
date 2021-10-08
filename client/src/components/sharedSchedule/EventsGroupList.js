import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { sharedScheduleSharedEvents } from '../../redux/logic/projectManager/sharedScheduleSlice';
import EventCardView from './EventCardView';
import ImageAnnotationDial from './ImageAnnotationDial';

const useStyles = makeStyles(() => ({
    root: {
        padding: '5px',
    },
    date: {
        fontSize: "1.25em",
        fontWeight: 600,
        textAlign: "start",
        margin: '15px 0 15px 15px',
    }
}));

const EventsGroupList = ({ setBackDropOpen }) =>
{
    const classes = useStyles();
    const events = useSelector(sharedScheduleSharedEvents);

    const [groupedEvents, setGroupedEvents] = useState([]);
    const [annotationDial, setAnnotationDial] = useState(false);
    const [image, setImage] = useState(null);
    const [annotations, setAnnotations] = useState([]);

    useEffect(() =>
    {
        const groupedEv = events.reduce((output, curr) =>
        {
            const day = new moment(new Date(parseInt(curr.start))).format("LL");
            if (output[day]) {
                output[day].push(curr);
            }
            else {
                const tmp = {};
                tmp[day] = [curr];
                output = { ...output, ...tmp }
            }
            return output;
        }, {});

        const array = [];
        for (let [key, value] of Object.entries(groupedEv)) {
            const tmp = {};
            tmp[key] = value;
            array.push(tmp);
        }
        setGroupedEvents(array);
    }, [events]);

    return <Grid container gap='10px' justifyContent="flex-start" className={classes.root}>
        {groupedEvents.map((eventGroup, key) =>
        {
            const [date] = Object.keys(eventGroup);
            const [arrayOfEvents] = Object.values(eventGroup);

            return <Grid key={key} item xs={12} >
                <Typography className={classes.date}>
                    {date}
                </Typography>
                <Box display="flex" flexDirection="column" rowGap="10px">
                    {arrayOfEvents.map((event) =>
                        <EventCardView
                            onOpenAnnotation={() => setAnnotationDial(true)}
                            key={event._id}
                            setBackDropOpen={setBackDropOpen}
                            setImage={(img) => setImage(img)}
                            setAnnotations={(anno) => setAnnotations(anno)}
                            data={event} />)}
                </Box>
            </Grid>
        })}
        <ImageAnnotationDial
            open={annotationDial}
            onClose={() => setAnnotationDial(false)}
            image={image}
            annotations={annotations}
        />
    </Grid>
}

export default EventsGroupList;