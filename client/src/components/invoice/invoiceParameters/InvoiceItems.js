import { Box, Grid, Typography, makeStyles, Button } from "@material-ui/core"
import InvoiceItem from "./InvoiceItem";
import { Add } from "@material-ui/icons"

const useStyles = makeStyles(() => ({
    rightSpacing: {
        marginRight: '5px',
    }
}));

const InvoiceItems = ({ invoice, classes }) =>
{
    const internalClasses = useStyles();
    return <Grid container>
        <Grid item xs={12}>
            <Box mt={2}>
                <Typography className={classes.sectionTitle}>Items</Typography>
                <InvoiceItem invoice={invoice} classes={classes} />
            </Box>
        </Grid>
        <Button
            color="primary"
            onClick={null}>
            <>
                <Add className={internalClasses.rightSpacing} />
                item
            </>
        </Button>
    </Grid>
}

export default InvoiceItems;