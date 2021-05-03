import { Box, Button, CircularProgress, Container, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { recupEmail, recupCode, canRecupCode, SET_EMAIL_RECUP, SET_CODE_READY_RECUP, SET_CODE_RECUP, SET_STEP_TWO, SET_CODE_ERROR, recupStep, passwordCode, SET_NEW_PASSWORD_RECUP, SET_STEP_THREE, SET_NEW_PASSWORD_ERROR, RESET_RECUP } from "../../redux/logic/auth/passwordRecupReducer";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GENERATE_RECUP_CODE, UPDATE_PASSWORD, VERIFY_RECUP_CODE } from "../../api/auth";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '24px',
        minHeight: '100%',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }, child: {
        padding: '24px 48px',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        margin: 'auto',
        marginBottom: '24px'
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
        backgroundColor: '#192d3e',
        width: '75%',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgb(18, 34, 48)'
        },
        alignSelf: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    // roundedBorders: {
    //     borderRadius: '24px',
    //     backgroundColor: 'white'
    // },
    // codeInput: {
    //     paddingTop: '10.5px',
    //     paddingBottom: '10.5px',
    //     display: 'flex'

    // }
    succesMSG: {
        paddingTop: '15px'
    },
    logo: {
        width: '30%',
    },
    title: {
        fontWeight: 'bold'
    }
}));

const RecupPasswordForm = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const email = useSelector(recupEmail);
    const code = useSelector(recupCode);
    const step = useSelector(recupStep);
    const codeReady = useSelector(canRecupCode);
    const newPassword = useSelector(passwordCode);

    const [generateCode, { loading }] = useMutation(GENERATE_RECUP_CODE, {
        onCompleted: (_) =>
        {
            dispatch(SET_CODE_READY_RECUP({ isReady: true }));
        }, onError: (_) =>
        {
            dispatch(SET_CODE_READY_RECUP({ isReady: false }));
        }
    });

    const [verifyCode] = useLazyQuery(VERIFY_RECUP_CODE, {
        onCompleted: ({ verifyRecupCode }) =>
        {
            if (verifyRecupCode.succes) {
                dispatch(SET_STEP_TWO());
            } else {
                dispatch(SET_CODE_ERROR());
            }
        }
    });

    const [submitNewPassword] = useMutation(UPDATE_PASSWORD, {
        onCompleted: () =>
        {
            dispatch(SET_STEP_THREE());
        },
        onError: () =>
        {
            dispatch(SET_NEW_PASSWORD_ERROR());
        }
    });

    function handleEmailChange(event)
    {
        dispatch(SET_EMAIL_RECUP({ email: event.target.value }))
    }

    function handleEmailSubmit(event)
    {
        event.preventDefault();
        generateCode({ variables: { email: email.value } });
    }

    function handleCodeReset(event)
    {
        event.preventDefault();
        dispatch(SET_CODE_READY_RECUP({ isReady: false }));
    }

    function handleCodeChange(event)
    {
        dispatch(SET_CODE_RECUP({ code: event.target.value }));
    }

    function handleCodeSubmit(event)
    {
        event.preventDefault();
        verifyCode({ variables: { email: email.value, code: code.value } });
    }

    function handlePasswordChange(event)
    {
        dispatch(SET_NEW_PASSWORD_RECUP({ password: event.target.value }));

    }
    function handlePasswordSubmit(event)
    {
        event.preventDefault();
        submitNewPassword({
            variables: {
                email: email.value,
                password: newPassword.value
            }
        });
    }
    function reset(event)
    {
        dispatch(RESET_RECUP());
    }

    return (<Grid item xs={12} sm={8} md={4} square className={classes.root}>
        <Container className={classes.child}>
            <Logo size='30%' />
            <Box mb={2}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Password recupertaion
            </Typography>
            </Box>
            {step === 1 && <form className={classes.form} noValidate>
                {!codeReady ? <div>
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
                    <Button
                        type="submit"
                        fullWidth
                        className={classes.submit}
                        variant="contained"
                        disabled={!email.ready}
                        onClick={handleEmailSubmit}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Generate recuperation code'}

                    </Button>  </div> :
                    <div>
                        <Box my={2} >
                            Validation code of 9 digits was send to <span style={{ fontWeight: 'bold' }}>{email.value}</span>.
                            <br />Expires in 24 hours.
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleCodeReset}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Reset'}
                        </Button>
                    </div>}




                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="code"
                    label="Code"
                    name="code"
                    autoFocus
                    disabled={!codeReady}
                    value={code.value}
                    inputProps={{ maxLength: 9 }}
                    type="text"
                    onChange={handleCodeChange}
                    error={code.error !== null}
                    helperText={code.error !== null && code.error}
                />
                {/* <div className={classes.codeInput}>
                    {
                        code.value.map((value, key) =>
                        {
                            return <div>
                                <TextField
                                    size="small"
                                    variant="filled"
                                    id={key.toString()}
                                    key={key}
                                    inputProps={{
                                        maxLength: 1,
                                        style: {
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            textAlign: 'center'
                                        }
                                    }}
                                // value={value}
                                />
                                {key + 1 % 3 === 0 && <span>-</span>}
                            </div>
                        })
                    }
                </div> */}
                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                    disabled={!code.ready}
                    onClick={handleCodeSubmit}
                >
                    {false ? <CircularProgress size={24} /> : 'Recuperate'}

                </Button>
            </form>}
            {step === 2 && < form className={classes.form} noValidate>
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="newPassword"
                    label="New password"
                    name="newPassword"
                    autoFocus
                    disabled={!codeReady}
                    value={newPassword.value}
                    type="password"
                    onChange={handlePasswordChange}
                    error={newPassword.error !== null}
                    helperText={newPassword.error !== null && newPassword.error}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    disabled={!code.ready}
                    onClick={handlePasswordSubmit}
                >
                    {false ? <CircularProgress size={24} /> : 'Update password'}

                </Button>
            </form>}
            {step === 3 && < span className={classes.succesMSG}>
                Password change succeeded!
                <br />
                Proceed to <s />
                <Link href="/login" to="/login" variant="body2" onClick={reset}>
                    login
                </Link>
            </span>}
        </Container>
    </Grid >)
}

export default RecupPasswordForm;