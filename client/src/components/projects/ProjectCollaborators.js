import { Box, Container, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import CollaboratorCard, { CollaboratorHeader } from "./collaborators/CollaboratorCard";

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
        overflowY: 'auto'
    }
}));

const ProjectCollaborators = () =>
{
    const classes = useStyles();
    return <Grid item xs={10} className={classes.root}>
        <Box my={2}>
            <Container>
                <CollaboratorHeader />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
                <CollaboratorCard />
            </Container>
        </Box>
    </Grid>
}

export default ProjectCollaborators;