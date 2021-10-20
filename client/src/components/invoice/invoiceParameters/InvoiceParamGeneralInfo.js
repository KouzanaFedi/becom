import { Grid, Typography } from "@material-ui/core"
import ThemedTextField from "../../themedComponents/ThemedTextField"
import { DateTimePicker } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { parseDateTimePicker } from "../../../utils/timeParser";

const InvoiceParamGeneralInfo = ({ classes, setDateInterval, register }) =>
{
    const [dates, setDates] = useState({
        date: parseDateTimePicker(new Date().getTime()),
        deadline: parseDateTimePicker(new Date().getTime())
    });

    useEffect(() =>
    {
        setDateInterval(dates);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates]);

    return <Grid container justifyContent="space-between">
        <Grid item xs={12}>
            <Typography className={classes.sectionTitle}>General information</Typography>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                label="Reference"
                inputProps={register('ref', { required: true })}
                backgroundColor='#EFE'
            />
        </Grid>
        <Grid item xs={6} className={classes.bottomMargin}>
            <DateTimePicker
                inputFormat="MM/DD/yyyy HH:mm"
                id="date"
                ampm={false}
                value={new Date()}
                renderInput={(props) => <ThemedTextField
                    fullwidth
                    label="created"
                    backgroundColor="#EFE"
                    {...props} />}
                onChange={(value) =>
                {
                    setDates({ ...dates, date: new Date(value).getTime() });
                }} />
        </Grid>
        <Grid item xs={6} className={classes.bottomMargin}>
            <DateTimePicker
                inputFormat="MM/DD/yyyy HH:mm"
                id="date"
                ampm={false}
                value={new Date().getTime()}
                renderInput={(props) => <ThemedTextField
                    label="deadline"
                    fullwidth
                    backgroundColor="#EFE"
                    {...props} />}
                onChange={(value) =>
                {
                    setDates({ ...dates, deadline: new Date(value).getTime() });
                }} />
        </Grid>
        <Grid item xs={12}>
            <ThemedTextField
                className={classes.bottomMargin}
                borderRadius="5px"
                inputProps={register('clientCode', { required: true })}
                placeholder="Client Code"
                backgroundColor='#EFE'
            />
        </Grid>
    </Grid >
}

export default InvoiceParamGeneralInfo;