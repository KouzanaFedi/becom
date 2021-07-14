import { Grid, Typography } from "@material-ui/core";
import ThemedTextField from "../../themedComponents/ThemedTextField";

const InvoiceParamClient = ({ invoice, classes }) =>
{
    return <Grid item xs={6}>
        <form noValidate className={classes.root}>
            <Typography className={classes.sectionTitle}>Client</Typography>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                id="receiver_entreprise"
                placeholder="Entreprise"
                name="receiver_entreprise"
                autoComplete="receiver_entreprise"
                value={invoice.receiver.entreprise}
                onChange={(event) =>
                {
                }}
                backgroundColor='#EFE'
            />
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_address"
                placeholder="Address"
                autoComplete="receiver_address"
                id="receiver_address"
                size="small"
                value={invoice.receiver.address}
                onChange={null}
                backgroundColor='#EFE'
            />
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                required
                name="receiver_city"
                placeholder="City"
                autoComplete="receiver_city"
                id="receiver_city"
                size="small"
                value={invoice.receiver.city}
                onChange={null}
                backgroundColor='#EFE'
            />
            <ThemedTextField
                borderRadius="5px"
                required
                name="receiver_matFis"
                placeholder="Tax registration number"
                autoComplete="receiver_matFis"
                id="receiver_matFis"
                size="small"
                value={invoice.receiver.matFis}
                onChange={null}
                backgroundColor='#EFE'
            />
        </form>
    </Grid>
}

export default InvoiceParamClient;