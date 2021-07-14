import { Box, Grid, Typography } from "@material-ui/core"
import { Controller } from "react-hook-form";
import ThemedTextField from "../../themedComponents/ThemedTextField"

const InvoiceParamGeneralInfo = ({ invoice, classes, control }) =>
{
    return <>
        <Box mb={2}>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <img src={invoice.logo} alt='logo' />
                </Grid>
                <Grid item xs={6}>
                    <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(event) =>
                        {
                            // setNewImage(event.target.files[0]);
                        }} />
                </Grid>
            </Grid>
        </Box>
        <Grid container direction='column'>
            <Grid item xs={12}>
                <Typography className={classes.sectionTitle}>General information</Typography>
                <Controller
                    name="invoiceType"
                    control={control}
                    render={({ field }) => <ThemedTextField
                        className={classes.bottomMargin}
                        borderRadius="5px"
                        id="invoice_type"
                        placeholder="Invoice type"
                        autoComplete="invoice_type"
                        {...field}
                        // value={invoice.generalInfo.invoiceType}
                        // onChange={(event) => { }}
                        backgroundColor='#EFE'
                    />}
                />
                <ThemedTextField
                    className={classes.bottomMargin}
                    borderRadius="5px"
                    required
                    id="ref"
                    placeholder="Reference"
                    name="ref"
                    autoComplete="ref"
                    value={invoice.generalInfo.ref}
                    onChange={(event) => { }}
                    backgroundColor='#EFE'
                />
                <ThemedTextField
                    className={classes.bottomMargin}
                    borderRadius="5px"
                    required
                    id="date"
                    placeholder="Date"
                    name="date"
                    autoComplete="date"
                    value={invoice.generalInfo.date}
                    onChange={(event) => { }}
                    backgroundColor='#EFE'
                />
                <ThemedTextField
                    className={classes.bottomMargin}
                    borderRadius="5px"
                    required
                    id="deadline"
                    placeholder="Deadline"
                    name="deadline"
                    autoComplete="deadline"
                    value={invoice.generalInfo.deadline}
                    onChange={(event) => { }}
                    backgroundColor='#EFE'
                />
                <ThemedTextField
                    className={classes.bottomMargin}
                    borderRadius="5px"
                    required
                    id="client_code"
                    placeholder="Client Code"
                    name="clientCode"
                    autoComplete="clientCode"
                    value={invoice.generalInfo.clientCode}
                    onChange={(event) => { }}
                    backgroundColor='#EFE'
                />
            </Grid>
        </Grid>
    </>
}

export default InvoiceParamGeneralInfo;