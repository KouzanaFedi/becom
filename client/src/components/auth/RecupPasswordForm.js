import { Box, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { recupEmail, recupCode, canRecupCode, SET_EMAIL_RECUP, SET_CODE_READY_RECUP, SET_CODE_RECUP, SET_STEP_TWO, SET_CODE_ERROR, recupStep, passwordCode, SET_NEW_PASSWORD_RECUP, SET_STEP_THREE, SET_NEW_PASSWORD_ERROR, RESET_RECUP } from "../../redux/logic/auth/passwordRecupReducer";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GENERATE_RECUP_CODE, UPDATE_PASSWORD, VERIFY_RECUP_CODE } from "../../api/auth";
import { Link } from "react-router-dom";
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
    succesMSG: {
        paddingTop: '15px'
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
    stretch: {
        display: 'flex',
        flexDirection: 'column'
    },
    marginTop25: {
        marginTop: '25px'
    },
    divider: {
        width: '10rem',
        margin: '15px 0',
        alignSelf: 'center'
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

    const emailTooltip = createRef();
    const codeTooltip = createRef();
    const recupTooltip = createRef();

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
            handleCodeReset();
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

    return (<Grid item xs={12} sm={8} md={4} className={classes.root}>
        <Container className={classes.child}>
            <Box className={classes.logo}>
                <Logo size='80px' shadow={false} />
            </Box>
            <Typography component="h1" className={classes.title}>
                Recuperate password
            </Typography>
            {step === 1 && <form className={classes.form} noValidate>
                {!codeReady ? <div className={classes.stretch}>
                    <ThemedTooltip
                        open={() => email.error != null}
                        placement="left"
                        title={() => email.error}
                        ref={emailTooltip}
                        arrow>
                        <ThemedTextField
                            borderRadius="5px "
                            required
                            id="email"
                            placeholder="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email.value}
                            onChange={handleEmailChange}
                            backgroundColor='#fff'
                        />
                    </ThemedTooltip>
                    <div className={classes.marginTop25} />
                    <ThemedButton
                        buttonStyle={{ type: "primary" }}
                        disabled={!email.ready}
                        onClick={handleEmailSubmit}
                    >
                        {loading ? <CircularProgress color="secondary"
                            size={24} /> : 'Generate recuperation code'}
                    </ThemedButton>
                </div> :
                    <div>
                        <Box my={2} >
                            Validation code of 9 digits was send to <span style={{ fontWeight: 'bold' }}>{email.value}</span>.
                            <br />Expires in 24 hours.
                        </Box>
                        <ThemedButton
                            buttonStyle={{ type: "denied" }}
                            onClick={handleCodeReset}
                        >
                            {loading ? <CircularProgress color="secondary"
                                size={24} /> : 'Reset'}
                        </ThemedButton>
                    </div>}
                <Divider className={classes.divider} />
                <ThemedTooltip
                    open={() => code.error !== null}
                    placement="left"
                    title={() => code.error}
                    ref={codeTooltip}
                    arrow>
                    <ThemedTextField
                        borderRadius="5px "
                        required
                        id="code"
                        placeholder="code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        disabled={!codeReady}
                        inputProps={{ maxLength: 9 }}
                        type="text"
                        value={code.value}
                        onChange={handleCodeChange}
                        backgroundColor='#fff'
                    />
                </ThemedTooltip>
                <div className={classes.marginTop25} />
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    disabled={!code.ready}
                    onClick={handleCodeSubmit}
                >
                    {loading ? <CircularProgress color="secondary"
                        size={24} /> : 'Recuperate'}
                </ThemedButton>
            </form>}
            {step === 2 && < form className={classes.form} noValidate>
                <ThemedTooltip
                    open={() => newPassword.error !== null}
                    placement="left"
                    title={() => newPassword.error}
                    ref={recupTooltip}
                    arrow   >
                    <ThemedTextField
                        borderRadius="5px "
                        required
                        id="newPassword"
                        placeholder="New password"
                        name="newPassword"
                        autoComplete="newPassword"
                        autoFocus
                        type="password"
                        value={newPassword.value}
                        onChange={handlePasswordChange}
                        backgroundColor='#fff'
                    />
                </ThemedTooltip>
                <div className={classes.marginTop25} />
                <ThemedButton
                    buttonStyle={{ type: "primary" }}
                    disabled={!newPassword.ready}
                    onClick={handlePasswordSubmit}
                >
                    {loading ? <CircularProgress color="secondary"
                        size={24} /> : 'Update password'}
                </ThemedButton>
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