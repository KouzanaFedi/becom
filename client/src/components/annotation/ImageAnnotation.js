import { useState } from 'react';
import Annotation from 'react-image-annotation';
import { makeStyles } from "@material-ui/styles";
import { PointSelector, RectangleSelector, OvalSelector } from 'react-image-annotation/lib/selectors'
import AnnotationEditor from './AnnotationEditor';
import ThemedButton from '../themedComponents/ThemedButton';
import { FiberManualRecordTwoTone, CropTwoTone, AllOutTwoTone } from '@material-ui/icons';
import { Box, Grid, Typography } from '@material-ui/core';
import AnnotationNotes from './AnnotationComment';

const useStyles = makeStyles((theme) => ({
    container: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
    },
    root: {
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    annotator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative !important'
    },
    actions: {
        display: 'flex',
        gap: '10px',
        margin: `${theme.spacing(2)} 0`,
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
const ImageAnnotation = () =>
{
    const [type, setType] = useState(RectangleSelector.TYPE);
    const classes = useStyles();

    const [annotations, setAnnotations] = useState([{
        data: {
            text: "borrr",
            id: 787
        },
        geometry: {
            height: 13.593418129440199,
            type: "RECTANGLE",
            width: 8.931185944363103,
            x: 11.6398243045388,
            y: 6.406093601230439
        },
        selection: {
            anchorX: 11.6398243045388,
            anchorY: 6.406093601230439,
            mode: "EDITING",
            showEditor: true,
        }
    },
    {
        data: {
            text: "azefazef",
            id: 0.6498469994680112
        },
        geometry: {
            type: "RECTANGLE"
            , x: 33.74816983894583,
            y: 8.872901678657074,
            width: 11.493411420204978,
            height: 23.02158273381295
        }
    }]);


    const [annotation, setAnnotation] = useState({});
    const [activeAnnotations, setActiveAnnotations] = useState([]);

    const onChange = (annotation) =>
    {
        setAnnotation(annotation)
    }

    const onSubmit = (annotation) =>
    {
        const { geometry, data } = annotation

        setAnnotation({});
        setAnnotations(annotations.concat({
            geometry,
            data: {
                ...data,
                id: Math.random()
            }
        }));
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
        <Grid item xs={8} className={classes.root}>
            <div className={classes.actions}>
                <ThemedButton
                    className={classes.button}
                    buttonStyle={{ type: "primary" }}
                    variant="outlined"
                    fullWidth={false}
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
                    onClick={() => onChangeType(OvalSelector.TYPE)}>
                    <div className={classes.actionContent}>
                        <AllOutTwoTone />
                        <Typography>
                            {OvalSelector.TYPE}
                        </Typography>
                    </div>
                </ThemedButton>
            </div>
            <Box
                className={classes.annotator}
            >
                <Annotation
                    src="https://www.nicepng.com/png/full/241-2414375_click-for-full-sized-image-another-robert-sprite.png"
                    alt='Image to annote'
                    annotations={annotations}
                    type={type}
                    value={annotation}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    disableAnnotation={false}
                    activeAnnotations={activeAnnotations}
                    activeAnnotationComparator={activeAnnotationComparator}
                    renderEditor={(props) => <AnnotationEditor {...props} />}
                />
            </Box>
        </Grid>
        <Grid item xs={4}>
            <AnnotationNotes
                annotations={annotations}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            />
        </Grid>
    </Grid>
}

export default ImageAnnotation;

