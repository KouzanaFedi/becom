import { Box, Container, CssBaseline, makeStyles, Typography } from "@material-ui/core";
import ThemedAppBar from "../components/themedComponents/ThemedAppBar";
import { useSelector } from "react-redux";
import { userData } from '../redux/logic/userSlice';
import moment from "moment";
import { firstLetterUppercase } from "../utils/stringValidation";
import ThemedMenu from "../components/themedComponents/ThemedMenu";
import { IMAGE_ENDPOINT } from '../config';
import UploadProfileImgDial from "../components/UploadProfileImgDial";
import { useState } from "react";
import ThemedAvatar from "../components/themedComponents/ThemedAvatar";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'calc(100vh - 40px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    head: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    greetingMsg: {
        fontSize: '26px',
        fontWeight: 'bold'
    }
}));

function greetingMsg(name)
{
    const time = new moment().hours();
    return `${time < 12 ? 'Good morning' : 'Good afternoon'}, ${firstLetterUppercase(name)}`;
}

const Home = () =>
{
    const classes = useStyles();
    const user = useSelector(userData);
    const [dialIsOpen, setDialIsOpen] = useState(false);

    return <div>
        <CssBaseline />
        <ThemedAppBar />
        <Container className={classes.root}>
            <Box className={classes.head}>
                <UploadProfileImgDial
                    open={dialIsOpen}
                    name={user.name}
                    email={user.email}
                    onClose={() =>
                    {
                        setDialIsOpen(false);
                    }} />
                <ThemedAvatar
                    name={user.name}
                    image={user.image != null ? `${IMAGE_ENDPOINT}${user.image}` : null}
                    opneDial={() =>
                    {
                        setDialIsOpen(true);
                    }} />
                <Typography className={classes.greetingMsg}>{user.name !== null && greetingMsg(user.name)}</Typography>
            </Box>
            <Box>
                <ThemedMenu open={true} handleListKeyDown={() => { }} />
            </Box>
        </Container>
    </div>
}

export default Home;