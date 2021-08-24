import { Container } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import LoadingLogo from "../components/themedComponents/LoadingLogo";


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
    }
}));

const SplashScreen = () =>
{
    const classes = useStyles();
    return <Container className={classes.root}>
        <LoadingLogo />
    </Container>
}

export default SplashScreen;