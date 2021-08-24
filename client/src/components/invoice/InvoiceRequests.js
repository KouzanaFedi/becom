import { Box, Grid } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    fixOverflow: {
        overflowY: 'auto',
        height: 'auto',
        maxHeight: 'calc(100vh - 40px)',
        marginTop: '4px',
        marginBottom: '4px',
    }
}));

const InvoiceRequests = () =>
{
    const classes = useStyles();
    return <Grid item xs={10} className={classes.fixOverflow}>
        <Box my={0.5}>
            <div>Requests</div>
        </Box>
    </Grid>
}

export default InvoiceRequests;