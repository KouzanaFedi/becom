import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom"
import Copyright from "../Copyright"
import { logInPassword, logInEmail, SET_PASSWORD_LOGIN, SET_EMAIL_LOGIN, logInCanSubmit, SET_PASSWORD_ERROR_LOGIN, RESET_LOGIN } from "../../redux/logic/auth/logInReducer";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../api/auth";
import { USER_NOT_EXISTS_ERROR, PASSWORD_INVALIDE_ERROR } from '../../utils/errors'
import { AUTH_TOKEN } from "../../utils/constants";
import facebook from "../../assets/iconsfacebook.png";
import google from "../../assets/iconsgoogle.png";
import Logo from "../Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '24px',
        minHeight: '100%',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    child: {
        padding: '24px 48px',
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: '#192d3e',
        width: '75%',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgb(18, 34, 48)'
        },
        alignSelf: 'center'
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
        width: '30%',
    },
    title: {
        fontWeight: 'bold'
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
    const canSubmit = useSelector(logInCanSubmit);

    const [loginQuery, { loading }] = useMutation(LOGIN, {
        onCompleted: ({ login }) =>
        {
            dispatch(RESET_LOGIN());
            localStorage.setItem(AUTH_TOKEN, login.token);
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

    return (<Grid item xs={12} sm={8} md={4} className={classes.root}>
        <Container className={classes.child}>
            <Logo size='30%' />
            <Box mb={2}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Login to your account
            </Typography>
            </Box>
            <form noValidate style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="name"
                    label="Email"
                    name="email"
                    autoComplete="name"
                    autoFocus
                    value={email.value}
                    onChange={handleEmailChange}
                    error={email.error !== null}
                    helperText={email.error !== null && email.error}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    size="small"
                    value={password.value}
                    onChange={handlePasswordChange}
                    error={password.error !== null}
                    helperText={password.error !== null && password.error}
                />
                <Link href="#" variant="body2" to="/recup" style={{
                    display: 'flex',
                    justifySelf: 'right',
                    padding: '6px 0 0'
                }}>
                    Forgot password?
                </Link>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                >
                    {loading ? <CircularProgress size={24} /> : 'Login'}

                </Button>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Divider style={{ width: '3rem' }} />
                    <div style={{
                        fontWeight: 'bold',
                        padding: '0 12px '
                    }}>OR <span style={{ fontWeight: 'normal' }}>login with</span></div>
                    <Divider style={{ width: '3rem' }} />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    style={{
                        width: '60%',
                        backgroundColor: '#039BE5'
                    }}
                >
                    <div className={classes.oauthButton}>
                        <img src={facebook} alt='fb' className={classes.paddingRightImg} />
                        <span>Facebook</span>
                    </div>
                </Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    style={{
                        marginTop: '0',
                        width: '60%',
                        backgroundColor: 'white',
                        color: 'black'
                    }}
                >
                    <div className={classes.oauthButton}>
                        <img src={google} alt='google' className={classes.paddingRightImg} />
                        <span>google</span>
                    </div>
                </Button>

                <p style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '10px'
                }}>
                    Don't have an account?
                    <Link href="#" to="/register" variant="body2">
                        Sign up
                    </Link>
                </p>

                <Box mt={5}>
                    <Copyright />
                </Box>
            </form>
        </Container>
    </Grid>)
}

export default LoginForm;