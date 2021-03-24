import React from 'react';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import LoginForm from '../components/auth/LoginForm';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: '72px 24px',
        justifyContent:'center'
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