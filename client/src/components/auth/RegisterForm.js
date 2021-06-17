import { Box, CircularProgress, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerCanSubmit, registerEmail, registerName, SET_NAME_REGISTER, SET_EMAIL_REGISTER, SET_PASSWORD_REGISTER, SET_CONFIRME_PASSWORD_REGISTER, UPDATE_FIELDS_WHEN_EMAIL_EXISTS_REGISTER, registerPassword, registerConfirmePassword, RESET_REGISTER } from "../../redux/logic/auth/registerReducer";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../api/auth";
import { USER_EXISTS_ERROR } from "../../utils/errors";
// import facebook from "../../assets/iconsfacebook.png";
// import google from "../../assets/iconsgoogle.png";
import Logo from "../Logo";
import ThemedTextField from "../themedComponents/ThemedTextField";
import ThemedButton from "../themedComponents/ThemedButton";
import ThemedTooltip from "../themedComponents/ThemedTooltip";
import { createRef } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    child: {
        padding: '0 48px',
        textAlign: 'center'
    },
    oauthButton: {
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    paddingRightImg: {
        paddingRight: '10px'
    },
    logo: {
        width: '100px',
        height: '100px',
        borderRadius: '20px',
        boxShadow: '4px 4px 5px 0px rgb(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: '28px',
        margin: "30px 0 25px 0 ",
        color: '#000'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    haveAccount: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '25px',
        fontSize: '14px'
    },
    marginTop25: {
        marginTop: '25px'
    },
    buttonIcon: {
        height: '20px',
        paddingRight: '10px'
    },
}));


const RegisterForm = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const name = useSelector(registerName);
    const email = useSelector(registerEmail);
    const password = useSelector(registerPassword);
    const confirmePassword = useSelector(registerConfirmePassword);
    const canSubmit = useSelector(registerCanSubmit);

    const tooltipRef = createRef();

    const history = useHistory();
    const [register, { loading }] = useMutation(REGISTER, {
        onCompleted: ({ register }) =>
        {
            dispatch(RESET_REGISTER());
            history.replace('/login', { email: register.email });
        },
        onError: ({ message }) =>
        {
            const errorCode = message.split(':')[0].trim();
            if (errorCode === USER_EXISTS_ERROR) {
                dispatch(UPDATE_FIELDS_WHEN_EMAIL_EXISTS_REGISTER());
            }
        }
    });

    function handleSubmit(event)
    {
        event.preventDefault();
        register({
            variables: {
                name: name.value, email: email.value, password: password.value
            },
        });
    }

    function handleNameChange(event)
    {
        dispatch(SET_NAME_REGISTER({ name: event.target.value }));
    }

    function handleEmailChange(event)
    {
        dispatch(SET_EMAIL_REGISTER({ email: event.target.value }));
    }

    function handlePasswordChange(event)
    {
        dispatch(SET_PASSWORD_REGISTER({ password: event.target.value }));
    }

    function handleConfirmePasswordChange(event)
    {
        dispatch(SET_CONFIRME_PASSWORD_REGISTER({ confirmePassword: event.target.value }));
    }

    const tooltipOpen = () =>
    {
        return (email.error !== null) ||
            (password.error !== null) ||
            (name.error !== null) ||
            (confirmePassword.error !== null);
    }
    const tooltipMsg = () =>
    {
        return `${name.error !== null ? name.error + '\n' : ''}
        ${email.error !== null ? email.error + '\n' : ''}
        ${password.error !== null ? password.error + '\n' : ''} 
        ${confirmePassword.error !== null ? confirmePassword.error : ''}`;
    }

    return (<Grid item xs={12} sm={8} md={4} className={classes.root}>
        <Container className={classes.child}>
            <Box className={classes.logo}>
                <Logo size='80px' shadow={false} />
            </Box>
            <Typography component="h1" className={classes.title}>
                Register client account
            </Typography>
            <form noValidate className={classes.form}>
                <ThemedTextField
                    borderRadius="5px 5px 0 0"
                    required
                    id="name"
                    placeholder="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name.value}
                    onChange={handleNameChange}
                    backgroundColor='#fff'
                />
                <ThemedTextField
                    borderRadius="0px"
                    required
                    id="email"
                    placeholder="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email.value}
                    onChange={handleEmailChange}
                    backgroundColor='#fff'
                />
                <ThemedTooltip
                    open={tooltipOpen}
                    placement="left"
                    title={tooltipMsg}
                    ref={tooltipRef}
                    arrow
                >
                    <div />
                </ThemedTooltip>
                <ThemedTextField
                    borderRadius="0px"
                    required
                    id="password"
                    placeholder="password"
                    name="password"
                    autoComplete="password"
                    type="password"
                    autoFocus
                    value={password.value}
                    onChange={handlePasswordChange}
                    backgroundColor='#fff'
                />
                <ThemedTextField
                    borderRadius="0 0 5px 5px"
                    required
                    id="confirmePassword"
                    placeholder="Confirme password"
                    name="confirmePassword"
                    type="password"
                    autoFocus
                    value={confirmePassword.value}
                    onChange={handleConfirmePasswordChange}
                    backgroundColor='#fff'
                />
                <div className={classes.marginTop25} />
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                >
                    {loading ? <CircularProgress
                        color="secondary"
                        size={24} /> : 'Register'}
                </ThemedButton>
                {/* <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '25px 0'
                }}>
                    <Divider style={{ width: '5rem' }} />
                    <div style={{
                        padding: '0 5px',
                        color: '#9F9F9F'
                    }}>Or register with  </div>
                    <Divider style={{
                        width: '5rem',
                        color: '#9F9F9F'
                    }} />
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <ThemedButton
                            buttonStyle={{
                                backgroundColor: '#039BE5',
                                fontColor: '#fff'
                            }}
                        >
                            <img src={facebook} alt='fb' className={classes.buttonIcon} />
                            <span>Facebook</span>
                        </ThemedButton>
                    </Grid>
                    <Grid item xs={6}>
                        <ThemedButton
                            buttonStyle={{
                                backgroundColor: '#fff',
                                fontColor: '#000'
                            }}
                            onClick={() =>
                            {
                            }}
                        >
                            <img src={google} alt='google' className={classes.buttonIcon} />
                            <span>Google</span>
                        </ThemedButton>
                    </Grid>
                </Grid> */}
                <Typography className={classes.haveAccount}>
                    Already got an account?&nbsp;
                    <Link href="#" to="/login" variant="body2">
                        Sign in
                    </Link>
                </Typography>
            </form>
        </Container>
    </Grid>)
}

export default RegisterForm;