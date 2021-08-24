import { Backdrop } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import LoadingLogo from "./LoadingLogo"

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: '555555555',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // height: '100vh',
        // width: '100vw',
    }
}));

const ThemedBackDrop = ({ backDropOpen }) =>
{
    const classes = useStyles();

    return <Backdrop className={classes.backdrop} open={backDropOpen} >
        <LoadingLogo />
    </Backdrop>
}

export default ThemedBackDrop;