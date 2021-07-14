import { Typography } from "@material-ui/core";
import ThemedTextField from "../../themedComponents/ThemedTextField";

const InvoiceParamEntreprise = ({ classes, entreprise, address, street, phone, email, web, errors }) =>
{
    return < >
        <Typography className={classes.sectionTitle}>Company</Typography>
        <ThemedTextField
            className={classes.bottomMargin}
            borderRadius="5px"
            label="Entreprise"
            autoComplete="sender_entreprise"
            backgroundColor='#EFE'
            inputProps={entreprise}
            error={errors?.sender?.entreprise !== undefined}
            helperText={errors?.sender?.entreprise !== undefined && errors.sender.entreprise.message}
        />
        <ThemedTextField
            className={classes.bottomMargin}
            borderRadius="5px"
            label="Street"
            autoComplete="sender_street"
            backgroundColor='#EFE'
            inputProps={street}
            error={errors?.sender?.street !== undefined}
            helperText={errors?.sender?.street !== undefined && errors.sender.street.message}
        />
        <ThemedTextField
            className={classes.bottomMargin}
            borderRadius="5px"
            label="Address"
            autoComplete="sender_address"
            backgroundColor='#EFE'
            inputProps={address}
            error={errors?.sender?.address !== undefined}
            helperText={errors?.sender?.address !== undefined && errors.sender.address.message}
        />
        <ThemedTextField
            className={classes.bottomMargin}
            borderRadius="5px"
            label="Phone"
            autoComplete="sender_phone"
            backgroundColor='#EFE'
            inputProps={phone}
            error={errors?.sender?.phone !== undefined}
            helperText={errors?.sender?.phone !== undefined && errors.sender.phone.message}
        />
        <ThemedTextField
            className={classes.bottomMargin}
            borderRadius="5px"
            label="Email"
            type='email'
            autoComplete="sender_email"
            backgroundColor='#EFE'
            inputProps={email}
            error={errors?.sender?.email !== undefined}
            helperText={errors?.sender?.email !== undefined && errors.sender.email.message}
        />
        <ThemedTextField
            borderRadius="5px"
            label="Website"
            autoComplete="sender_web"
            backgroundColor='#EFE'
            inputProps={web}
            error={errors?.sender?.web !== undefined}
            helperText={errors?.sender?.web !== undefined && errors.sender.web.message}
        />
    </>
}

export default InvoiceParamEntreprise;