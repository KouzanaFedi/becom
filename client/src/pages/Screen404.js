import { Container, CssBaseline, Grid, makeStyles, Typography } from "@material-ui/core";
import ThemedAppBar from "../components/themedComponents/ThemedAppBar";
import Illustration404 from "../assets/404.png";

const useStyles = makeStyles(() => ({
    root: {
        height: 'calc(100vh - 40px)',
    },
    illustration: {
        height: '80vh'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'start'
    },
    msg: {
        textAlign: 'start'
    },
    msgAlignment: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    illustrationAlignment:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
}));

const Screen404 = () =>
{
    const classes = useStyles();
    return <Container>
        <CssBaseline />
        <ThemedAppBar type="menu" />
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.msgAlignment}>
                <Typography component='h1' className={classes.title}>This page was lost</Typography>
                <Typography className={classes.msg}> The page you are looking for isn't available. Check the link or use the drop down menu above.</Typography>
            </Grid>
            <Grid item xs={9} className={classes.illustrationAlignment}>
                <img src={Illustration404} alt="404" className={classes.illustration}></img>
            </Grid>
        </Grid>
    </Container>
}

export default Screen404;