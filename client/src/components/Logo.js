import makeStyles from '@material-ui/styles/makeStyles';
import logo from "../assets/comguruLogo.png";

const useStyles = makeStyles((_) => ({
    logo: (props) =>
    ({
        width: props.size ? props.size : '100%',
        filter: props.shadow ? 'drop-shadow(5px 5px 5px rgba(0, 0, 0, .25))' : 'none'
    })
}))

const Logo = (props) =>
{
    const classes = useStyles(props);
    return <img src={logo} alt='logo' className={classes.logo} />

}

export default Logo;