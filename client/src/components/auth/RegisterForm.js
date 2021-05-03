import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Copyright from "../Copyright";
import { useDispatch, useSelector } from "react-redux";
import { registerCanSubmit, registerEmail, registerName, SET_NAME_REGISTER, SET_EMAIL_REGISTER, SET_PASSWORD_REGISTER, SET_CONFIRME_PASSWORD_REGISTER, UPDATE_FIELDS_WHEN_EMAIL_EXISTS_REGISTER, registerPassword, registerConfirmePassword, RESET_REGISTER } from "../../redux/logic/auth/registerReducer";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../api/auth";
import { USER_EXISTS_ERROR } from "../../utils/errors";
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


const RegisterForm = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const name = useSelector(registerName);
    const email = useSelector(registerEmail);
    const password = useSelector(registerPassword);
    const confirmePassword = useSelector(registerConfirmePassword);
    const canSubmit = useSelector(registerCanSubmit);

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


    return (<Grid item xs={12} sm={8} md={4} className={classes.root}>
        <Container className={classes.child}>
            <Logo size='30%' />
            <Box mb={2}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Register a new account
            </Typography>
            </Box>
            <form noValidate style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    error={name.error !== null}
                    helperText={name.error !== null && name.error}
                    value={name.value}
                    onChange={handleNameChange}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email.value}
                    error={email.error !== null}
                    helperText={email.error !== null && email.error}
                    onChange={handleEmailChange}
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
                    error={password.error !== null}
                    helperText={password.error !== null && password.error}
                    onChange={handlePasswordChange}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmePassword"
                    label="Confirme password"
                    type="password"
                    id="confirmePassword"
                    size="small"
                    value={confirmePassword.value}
                    error={confirmePassword.error !== null}
                    helperText={confirmePassword.error !== null && confirmePassword.error}
                    onChange={handleConfirmePasswordChange}
                />
                <Button
                    disabled={!canSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    {loading ? <CircularProgress size={24} /> : 'Register'}
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
                    }}>OR <span style={{ fontWeight: 'normal' }}>register with</span></div>
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
                    Already have an account? <Link href="/login" to="/login" variant="body2" >
                        Login.
                    </Link>
                </p>

                <Box mt={5}>
                    <Copyright />
                </Box>
            </form>
        </Container>
    </Grid>)
}

export default RegisterForm;