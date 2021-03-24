import React from 'react';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import RecupPasswordForm from '../components/auth/RecupPasswordForm';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: '72px 24px',
        justifyContent:'center'
    },
}));

export default function RecupPassword()
{
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <RecupPasswordForm />
        </Grid >
    );
}