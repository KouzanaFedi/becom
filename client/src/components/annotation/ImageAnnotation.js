import { useEffect, useState } from 'react';
import Annotation from 'react-image-annotation';
import { makeStyles } from "@material-ui/styles";
import { PointSelector, RectangleSelector, OvalSelector } from 'react-image-annotation/lib/selectors'
import AnnotationEditor from './AnnotationEditor';
import ThemedButton from '../themedComponents/ThemedButton';
import { FiberManualRecordTwoTone, CropTwoTone, AllOutTwoTone } from '@material-ui/icons';
import { Box, Grid, Typography } from '@material-ui/core';
import AnnotationNotes from './AnnotationComment';
import { IMAGE_ENDPOINT } from '../../config';
import { useMutation } from "@apollo/client";
import { ADD_ANNOTATION } from "../../api/events";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ANNOTATION_TO_EVENT, sharedScheduleSharedEvents } from '../../redux/logic/projectManager/sharedScheduleSlice';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "15px"
    },
    title: {
        fontSize: "1em",
        fontWeight: 800
    },
    annotator: {
        height: 'inherit',
        width: "inherit"
    },
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    actionContent: {
        display: 'flex',
        columnGap: '10px'
    },
    button: {
        fontSize: '14px',
        fontWeight: 700,
    },
    annotations: {
        display: 'flex',
        flexDirection: 'column'
    }
}));
const ImageAnnotation = ({ image }) =>
{
    const [type, setType] = useState(RectangleSelector.TYPE);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [annotationsData, setAnnotationsData] = useState([]);
    const sharedEvents = useSelector(sharedScheduleSharedEvents);

    useEffect(() =>
    {
        const eventIndex = sharedEvents.findIndex(event => event._id === image.idEvent);
        setAnnotationsData(sharedEvents[eventIndex].annotations.reduce((accum, occu) =>
        {
            const tmp = [...accum];
            tmp.push({
                data: {
                    id: occu._id,
                    text: occu.text,
                },
                geometry: {
                    type: occu.type,
                    x: parseFloat(occu.x),
                    y: parseFloat(occu.y),
                    width: parseFloat(occu.width),
                    height: parseFloat(occu.height)
                }
            });
            return tmp;
        }, []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sharedEvents, image]);

    const [annotation, setAnnotation] = useState({});
    const [activeAnnotations, setActiveAnnotations] = useState([]);

    const onChange = (annotation) =>
    {
        setAnnotation(annotation)
    }

    const [addAnnotation] = useMutation(ADD_ANNOTATION, {
        onCompleted: ({ addAnnotationToEvent }) =>
        {
            dispatch(ADD_ANNOTATION_TO_EVENT({ id: image.idEvent, annotation: addAnnotationToEvent }));
        }
    });

    const onSubmit = (annotation) =>
    {
        const { geometry, data } = annotation

        setAnnotation({});
        addAnnotation({
            variables: {
                id: image.idEvent,
                text: data.text,
                height: `${geometry.height}`,
                type: geometry.type,
                width: `${geometry.width}`,
                x: `${geometry.x}`,
                y: `${geometry.y}`
            }
        });
    }

    const onChangeType = (type) =>
    {
        setAnnotation({});
        setType(type);
    }

    const activeAnnotationComparator = (a, b) =>
    {
        return a.data.id === b
    }

    const onMouseOver = (id) =>
    {
        setActiveAnnotations([...activeAnnotations, id]);
    }

    const onMouseOut = (id) =>
    {
        const index = activeAnnotations.indexOf(id)

        setActiveAnnotations([...activeAnnotations.slice(0, index),
        ...activeAnnotations.slice(index + 1)]);
    }

    return <Grid container className={classes.container}>
        <Grid item xs={12} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography className={classes.title}>
                Annotate this image
            </Typography>
            <Typography>
                Select an annotation type, then select the area to annotate on the image and leave a note there.
            </Typography>
            <Box m={2} display="flex" justifyContent="center" columnGap="15px">
                <ThemedButton
                    className={classes.button}
                    buttonStyle={{ type: "primary" }}
                    variant="outlined"
                    fullWidth={false}
                    disabled={type === RectangleSelector.TYPE}
                    onClick={() => onChangeType(RectangleSelector.TYPE)}>
                    <div className={classes.actionContent}>
                        <CropTwoTone />
                        <Typography>
                            {RectangleSelector.TYPE}
                        </Typography>
                    </div>
                </ThemedButton>
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    variant="outlined"
                    fullWidth={false}
                    disabled={type === PointSelector.TYPE}
                    className={classes.button}
                    onClick={() => onChangeType(PointSelector.TYPE)}>
                    <div className={classes.actionContent}>
                        <FiberManualRecordTwoTone />
                        <Typography>
                            {PointSelector.TYPE}
                        </Typography>
                    </div>
                </ThemedButton>
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    className={classes.button}
                    variant="outlined"
                    fullWidth={false}
                    disabled={type === OvalSelector.TYPE}
                    onClick={() => onChangeType(OvalSelector.TYPE)}>
                    <div className={classes.actionContent}>
                        <AllOutTwoTone />
                        <Typography>
                            {OvalSelector.TYPE}
                        </Typography>
                    </div>
                </ThemedButton>
            </Box>
        </Grid>
        <Grid item xs={8} className={classes.root}>
            <Box px={2} py={4} display="flex" justifyContent="center" alignItems="center">
                <Annotation
                    src={`${IMAGE_ENDPOINT}${image?.src}`}
                    className={classes.annotator}
                    alt='Image to annote'
                    annotations={annotationsData}
                    type={type}
                    value={annotation}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    disableAnnotation={false}
                    activeAnnotations={activeAnnotations}
                    activeAnnotationComparator={activeAnnotationComparator}
                    renderEditor={(props) => <AnnotationEditor eventId={image.idEvent} {...props} />}
                />
            </Box>
        </Grid>
        <Grid item xs={4}>
            <AnnotationNotes
                idEvent={image.idEvent}
                annotations={annotationsData}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />
        </Grid>
    </Grid>
}

export default ImageAnnotation;

