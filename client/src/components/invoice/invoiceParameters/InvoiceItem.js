import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ThemedTextField from "../../themedComponents/ThemedTextField"


const InvoiceItem = ({ invoice, classes }) =>
{
    return <Grid container spacing={2}>
        <Box ml={4} mr={1} className={classes.itemsHead}>
            <Typography>Item 1</Typography>
            <IconButton
                size="small"
                color='secondary'
                onClick={() =>
                {
                }}>
                <Close fontSize="small" />
            </IconButton>
        </Box>
        <Grid item xs={12}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                multiline
                required
                rows={4}
                label='Designation'
                name="receiver_matFis"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.items[0].designtion}
                onChange={null}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_matFis"
                label="U.P"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.items[0].tva}
                onChange={null}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_matFis"
                label="U.P. Ex.T"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.items[0].pu}
                onChange={null}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_matFis"
                label="Quantity"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.items[0].quantity}
                onChange={null}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_matFis"
                label="Total Ex.T"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.items[0].total}
                onChange={null}
                backgroundColor='#EFE'
            />
        </Grid>
    </Grid>
}

export default InvoiceItem;