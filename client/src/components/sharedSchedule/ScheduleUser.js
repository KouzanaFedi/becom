import { Box, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles';
import ThemedButton from '../themedComponents/ThemedButton';
import { useState } from 'react';
import WaveEmoji from '../../assets/icons/wave-hand.png';
import EmailSent from '../../assets/icons/emailSent.png';
import Illustration from '../../assets/illustration1.svg';
import Illustration2 from '../../assets/illustration2.jpg';
import { useSelector } from "react-redux";
import { sharedScheduleSharedEvents } from '../../redux/logic/projectManager/sharedScheduleSlice';

const useStyles = makeStyles(() => ({
    emailSent: {
        maxWidth: "350px",
    },
    title: {
        fontSize: '2em',
        fontWeight: 800
    },
    title2: {
        fontSize: '1.75em',
        fontWeight: 700
    },
    illustrationWraper: {
        marginTop: "60px",
        height: "auto",
        width: "30vw"
    }
}));

const ScheduleUser = ({ scheduleUsers }) =>
{
    const classes = useStyles();
    const [emailSent, setEmailSent] = useState(null);
    const events = useSelector(sharedScheduleSharedEvents);

    return <Box my={2}>
        {!scheduleUsers.selected ? <Box display='flex' flexDirection="column" alignItems="center">
            {!emailSent ?
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" mb={2} columnGap="10px" alignItems="center">
                        <Typography className={classes.title}>
                            Hey there!
                        </Typography>
                        <img src={WaveEmoji} alt="wave" width="60px" />
                    </Box>
                    <Typography className={classes.emailSent}>Great content is waiting for your approval. Let's start by clicking your name, shall we?</Typography>
                    <Box display="flex" my={2} gap="10px">
                        {scheduleUsers.cible.map((cib) =>
                            <ThemedButton
                                variant="outlined"
                                buttonStyle={{ type: 'primary' }}
                                fullWidth={false}
                                onClick={() =>
                                {
                                    setEmailSent(cib);
                                }}
                            >
                                {cib.name}
                            </ThemedButton>)}
                    </Box>
                    <img className={classes.illustrationWraper} src={Illustration} alt="Illustration1" />
                </Box> : <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" mb={2} columnGap="10px" alignItems="center">
                        <Typography className={classes.title}>
                            Email on the way!
                        </Typography>
                        <img src={EmailSent} alt="email" width="50px" />
                    </Box>
                    <Typography className={classes.emailSent}>Check your email; <b>{emailSent.email}</b> your personalized link is there for the taking.</Typography>
                    <Box display="flex" my={2} gap="10px">
                        <img className={classes.illustrationWraper} src={Illustration2} alt="Illustration2" />
                    </Box>
                </Box>}
        </Box> :
            <Box display='flex' flexDirection="column" alignItems="center">
                <Box display="flex" mb={2} columnGap="10px" alignItems="center">
                    <Typography className={classes.title2}>
                        Welcome {scheduleUsers.selected.name}!
                    </Typography>
                    <img src={WaveEmoji} alt="wave" width="60px" />
                </Box>
                <Typography >
                    You currently have {events.length} post(s) to review.
                </Typography>
            </Box>
        }
    </Box >
}

export default ScheduleUser;