import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import LoginForm from '../components/auth/LoginForm';
import backgroundBlur from '../assets/backgroundBlur.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: '72px 24px',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundBlur})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 80%',
    }
}));

export default function Login()
{
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <LoginForm />
        </Grid >
    );
}