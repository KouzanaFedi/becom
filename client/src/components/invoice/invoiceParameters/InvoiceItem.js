import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ThemedTextField from "../../themedComponents/ThemedTextField";


const InvoiceItem = ({ index, classes, register, remove }) =>
{
    return <Grid container spacing={2}>
        <Box ml={4} mr={1} pt={2} className={classes?.itemsHead}>
            <Typography><b>{index + 1}</b></Typography>
            <IconButton
                size="small"
                color='secondary'
                onClick={() =>
                {
                    remove(index)
                }}>
                <Close fontSize="small" />
            </IconButton>
        </Box>
        <Grid item xs={12}>
            <ThemedTextField
                className={classes?.bottomMargin}
                borderRadius="5px"
                multiline
                rows={4}
                label='Designation'
                inputProps={register(`items[${index}].designtion`, { required: true })}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes?.bottomMargin}
                borderRadius="5px"
                inputProps={register(`items[${index}].tva`, {
                    required: true,
                    valueAsNumber: true,
                    max: 100,
                    min: 0
                })}
                label="Tax %"
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes?.bottomMargin}
                borderRadius="5px"
                label="U.P"
                inputProps={register(`items[${index}].pu`, {
                    required: true,
                    valueAsNumber: true,
                })}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            <ThemedTextField
                className={classes?.bottomMargin}
                borderRadius="5px"
                inputProps={register(`items[${index}].quantity`,
                    {
                        required: true,
                        valueAsNumber: true,
                    })}
                label="Quantity"
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={3}>
            {/* <ThemedTextField
                className={classes?.bottomMargin}
                borderRadius="5px"
                disabled
                label="Total Ex.T"
                backgroundColor='#EFE'
            /> */}
        </Grid>
    </Grid>
}

export default InvoiceItem;