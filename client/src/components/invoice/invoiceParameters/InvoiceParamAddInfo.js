import { Grid, Typography } from "@material-ui/core";
import ThemedTextField from "../../themedComponents/ThemedTextField";

const InvoiceParamAddInfo = ({ classes, country, type, register, matFis, errors }) =>
{
    return <Grid container direction='column'>
        <Grid item xs={12}>
            <Typography className={classes.sectionTitle}>Additional information</Typography>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                label="Entreprise country"
                autoComplete="entreprise_country"
                backgroundColor='#EFE'
                inputProps={country}
                error={errors?.additionalInfo?.country !== undefined}
                helperText={errors?.additionalInfo?.country !== undefined && errors.additionalInfo.country.message}
            />
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                label="Entreprise type"
                autoComplete="entreprise_type"
                backgroundColor='#EFE'
                inputProps={type}
                error={errors?.additionalInfo?.entrepriseType !== undefined}
                helperText={errors?.additionalInfo?.entrepriseType !== undefined && errors.additionalInfo.entrepriseType.message}
            />
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                label="Company register"
                autoComplete="company_register"
                backgroundColor='#EFE'
                inputProps={register}
                error={errors?.additionalInfo?.rc !== undefined}
                helperText={errors?.additionalInfo?.rc !== undefined && errors.additionalInfo.rc.message}
            />
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                label="Tax registration number"
                autoComplete="entreprise_matFis"
                backgroundColor='#EFE'
                inputProps={matFis}
                error={errors?.additionalInfo?.matFisc !== undefined}
                helperText={errors?.additionalInfo?.matFisc !== undefined && errors.additionalInfo.matFisc.message}
            />
        </Grid>
    </Grid>
}

export default InvoiceParamAddInfo;