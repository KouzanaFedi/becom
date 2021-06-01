import { Box, Checkbox, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom"
import { logInPassword, logInEmail, SET_PASSWORD_LOGIN, SET_EMAIL_LOGIN, logInCanSubmit, SET_PASSWORD_ERROR_LOGIN, RESET_LOGIN, logInStaySignedIn, SET_STAY_SIGNED_IN } from "../../redux/logic/auth/logInReducer";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../api/auth";
import { USER_NOT_EXISTS_ERROR, PASSWORD_INVALIDE_ERROR } from '../../utils/errors'
import { AUTH_TOKEN, STAY_LOGGED_IN } from "../../utils/constants";
import facebook from "../../assets/iconsfacebook.png";
import google from "../../assets/iconsgoogle.png";
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
    },
    buttonIcon: {
        height: '20px',
        paddingRight: '10px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '31px',
        margin: "30px 0 25px 0 "
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
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    forgotPwd: {
        alignSelf: "flex-start",
        margin: '15px 0',
        '& a': {
            color: '#0070C9'
        }
    },
    haveAccount: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '25px',
        fontSize: '14px'
    }
}));

const LoginForm = () =>
{
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const email = useSelector(logInEmail);
    const password = useSelector(logInPassword);
    const staySignedIn = useSelector(logInStaySignedIn);
    const canSubmit = useSelector(logInCanSubmit);

    const tooltipRef = createRef();

    const [loginQuery, { loading }] = useMutation(LOGIN, {
        onCompleted: ({ login }) =>
        {
            dispatch(RESET_LOGIN());
            console.log(staySignedIn);
            localStorage.setItem(AUTH_TOKEN, login.token);
            localStorage.setItem(STAY_LOGGED_IN, staySignedIn);
            history.replace('/dashbord');
        }, onError: ({ message }) =>
        {
            const errorCode = message.split(':')[0].trim();
            if (errorCode === USER_NOT_EXISTS_ERROR || errorCode === PASSWORD_INVALIDE_ERROR) {
                dispatch(SET_PASSWORD_ERROR_LOGIN());
            }
        }
    });

    if (location.state) {
        dispatch(SET_EMAIL_LOGIN({ email: location.state.email }));
    }

    function handleEmailChange(event)
    {
        dispatch(SET_EMAIL_LOGIN({ email: event.target.value }));
    }

    function handlePasswordChange(event)
    {
        dispatch(SET_PASSWORD_LOGIN({ password: event.target.value }));
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        loginQuery({
            variables: {
                email: email.value, password: password.value
            }
        });
    }

    const tooltipOpen = () =>
    {
        console.log((email.error !== null) || (password.error !== null));
        return (email.error !== null) || (password.error !== null);
    }
    const tooltipMsg = () =>
    {
        return `${email.error !== null ? email.error + '\n' : ''} 
        ${password.error !== null ? password.error : ''}`;
    }

    return (<Grid item xs={12} sm={8} md={4} className={classes.root}>
        <Container className={classes.child}>
            <Box className={classes.logo}>
                <Logo size='80px' shadow={false} />
            </Box>
            <Typography component="h1" className={classes.title}>
                Sign in to platform
            </Typography>
            <form noValidate style={{ display: 'flex', flexDirection: 'column' }}>
                <ThemedTextField
                    borderRadius="5px 5px 0 0"
                    required
                    id="name"
                    placeholder="Email"
                    name="email"
                    autoComplete="name"
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
                    arrow>
                    <div></div>
                </ThemedTooltip>
                <ThemedTextField
                    borderRadius="0 0 5px 5px"
                    required
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    size="small"
                    value={password.value}
                    onChange={handlePasswordChange}
                    backgroundColor='#fff'
                />
                <Box my={2} className={classes.checkbox}>
                    <Checkbox
                        checked={staySignedIn}
                        onChange={(event) =>
                        {
                            dispatch(SET_STAY_SIGNED_IN({ checked: event.target.checked }));
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography>Keep me signed in</Typography>
                </Box>
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                >
                    {loading ? <CircularProgress size={24} /> : 'Sign in'}
                </ThemedButton>

                <Box className={classes.forgotPwd}>
                    <Link to="/recup">Forgot password?</Link>
                </Box>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '25px'
                }}>
                    <Divider style={{ width: '5rem' }} />
                    <div style={{
                        padding: '0 5px',
                        color: '#9F9F9F'
                    }}>Or sign in with  </div>
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
                </Grid>
                <Typography className={classes.haveAccount}>
                    Don't have an account?&nbsp;
                    <Link href="#" to="/register" variant="body2">
                        Sign up
                    </Link>
                </Typography>
            </form>
        </Container>
    </Grid>)
}

export default LoginForm;