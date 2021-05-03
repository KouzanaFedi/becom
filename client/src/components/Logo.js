import { Box, makeStyles } from "@material-ui/core"
import logo from "../assets/comguruLogo.png";

const useStyles = makeStyles((theme) => ({
    logo: props =>
    ({
        width: props.size
    })
}))

const Logo = (props = { size: '100%' }) =>
{
    const classes = useStyles(props);
    return <Box mb={2}>
        <img src={logo} alt='logo' className={classes.logo} />
    </Box>
}

export default Logo;