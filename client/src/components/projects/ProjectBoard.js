import { Box, Container, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { DragDropContext } from "react-beautiful-dnd";
// import { useEffect, useMemo, useState } from "react";
import { IMAGE_ENDPOINT } from "../../config";
import BoardColumn from "./board/BoardColumn";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
    },
    container: {
        display: 'flex',
        height: `calc(100vh - (40px + ${theme.spacing(2)}))`,
        paddingBottom: '40px'
    },
    overflow: {
        overflowX: 'auto',
        overflowY: 'hidden',
    }
}));

const ProjectBoard = () =>
{
    const data = [{
        id: "1",
        state: 'doing',
        color: "red",
        tasks: [
            {
                id: "1",
                section: "Site web",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "2",
                section: "Site web",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "3",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "4",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            }
        ]
    },
    {
        id: "2",
        state: 'done',
        color: "blue",
        tasks: [
            {
                id: "5",
                section: "Site web",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "5",
                section: "Site web",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "6",
                section: "Site web",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "7",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "8",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "9",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "10",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }
                ]
            },
            {
                id: "11",
                section: "Compagne BNA",
                title: 'Velit laborum minim magna mollit adipisicing.',
                attachedFiles: 5,
                notes: 6,
                dueDate: '24/01/1998',
                assignedTo: [
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null },
                    { name: 'Fedi kouzana', image: `${IMAGE_ENDPOINT}/1625134958507.gif` }, { name: 'Fedi kouzana', image: null },
                ]
            }
        ]
    }];

    // const [boardData, setBoardData] = useState([]);

    // useEffect(() =>
    // {
    //     const test = dataMemoized.reduce((result, item) =>
    //     {
    //         const section = item.name;
    //         const obj = item.tasks.map((task) =>
    //         ({
    //             state: task.state,
    //             color: task.color,
    //             tasks: task.tasks.reduce((res, i) => [...res, { ...i, section }], [])
    //         }), {});

    //     },[]);
    // }, [dataMemoized]);

    function handleDragEnd(result)
    {
        if (!result.destination) return;
        console.log(result);
    }

    const classes = useStyles();
    return <Grid item xs={10} className={classes.root}>
        <Box mt={2}>
            <DragDropContext className={classes.overflow} onDragEnd={handleDragEnd}>
                <Container className={classes.container}>
                    {data.map((d, key) => <BoardColumn key={key} data={d} />)}
                </Container>
            </DragDropContext>
        </Box>
    </Grid>
}
export default ProjectBoard;