import guruguru from '../../assets/guruguru.png'
import { CircularProgress } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '200px',
        height: 'auto',
        marginBottom: '15px',

    }
}));

const LoadingLogo = () =>
{
    const classes = useStyles();
    return <div className={classes.root}>
        <img src={guruguru} alt="guruguru" className={classes.image} />
        <CircularProgress color="secondary" size={36} />
    </div>
}

export default LoadingLogo;