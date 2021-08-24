import { Box, Container, Grid } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import FileCard, { FileHeader } from "./files/FileCard";

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 'calc(100vh - 40px)',
        height: 'auto',
        overflowY: 'auto'
    }
}));

const ProjectFiles = () =>
{
    const classes = useStyles();
    return <Grid item xs={10} className={classes.root}>
        <Box my={2}>
            <Container>
                <FileHeader />
                <FileCard name="file.png" size={65464} />
                <FileCard name="file.jpg" size={6546465464} />
                <FileCard name="file.docx" size={654646548564} />
                <FileCard name="file.pdf" size={25} />
                <FileCard name="file.xls" size={65464} />
                <FileCard name="file.jpg" size={6546465464} />
                <FileCard name="file.docx" size={654646548564} />
                <FileCard name="file.pdf" size={25} />
                <FileCard name="file.xls" size={65464} />
                <FileCard name="file.jpg" size={6546465464} />
                <FileCard name="file.docx" size={654646548564} />
                <FileCard name="file.pdf" size={25} />
                <FileCard name="file.xls" size={65464} />
                <FileCard name="file.brr" size={65464} />
            </Container>
        </Box>
    </Grid>
}

export default ProjectFiles;