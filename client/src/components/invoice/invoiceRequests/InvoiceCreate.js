import { Grid, Box, Paper, Typography, MenuItem, IconButton } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useFieldArray, useForm } from 'react-hook-form';
import ThemedTextField from "../../themedComponents/ThemedTextField";
import { useSelector } from "react-redux";
import InvoiceParamGeneralInfo from "../invoiceParameters/InvoiceParamGeneralInfo";
import { invoiceTemplatesData } from "../../../redux/logic/projectManager/invoiceSlice";
import InvoiceItem from '../invoiceParameters/InvoiceItem';
import ThemedButton from "../../themedComponents/ThemedButton";
import { Add } from "@material-ui/icons";
import { useState } from "react";
import InvoicePreviewDial from "../InvoicePreviewDial";
import { IMAGE_ENDPOINT } from "../../../config";
import { parseDateTimePicker } from "../../../utils/timeParser"

const useStyles = makeStyles(() => ({
    fixOverflow: {
        overflowY: 'auto',
        height: 'calc(100vh - 56px)',
        margin: '4px 0',
        padding: '16px',
        width: "100%",
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
    },
    subTitle: {
        marginBottom: '24px',
        color: '#555',
        fontSize: ".85em"
    },
    bottomMargin: {
        marginBottom: '16px',
        width: '100%'
    },
    sectionTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: '10px',
        marginLeft: '5px'
    },
    itemsHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
}));

const InvoiceCreate = ({ data }) =>
{
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors, isValid }, reset, control, getValues } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });
    const [dialOpen, setDialOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [dateInterval, setDateInterval] = useState({
        date: parseDateTimePicker(new Date().getTime()),
        deadline: parseDateTimePicker(new Date().getTime())
    });
    const [previewData, setPreviewData] = useState({});

    const invoiceTemplates = useSelector(invoiceTemplatesData);

    function submit(params)
    {
        console.log(params);
    }

    return <Grid item container xs={5} display="flex" flexDirection="column" rowGap="15px" >
        <Box my={0.5}>
            <Paper className={classes.fixOverflow} elevation={4}>
                <Grid item xs={12}>
                    <Typography className={classes.title}>Create invoice template </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.subTitle}>for <b>{data.client.name}</b> </Typography>
                </Grid>
                <form id="fatureForm" onSubmit={handleSubmit(submit)}>
                    <Grid item xs={12}>
                        <ThemedTextField
                            inputProps={register('invoiceTemplate', { required: true })}
                            className={classes.bottomMargin}
                            borderRadius="5px"
                            backgroundColor='#EFE'
                            label='Invoice template'
                            select
                            error={errors?.invoiceTemplate !== undefined}
                            helperText={errors?.invoiceTemplate !== undefined && errors.invoiceTemplate.message}
                        >
                            {invoiceTemplates.map(template =>
                                <MenuItem value={template.id}>
                                    {template.templateName}
                                </MenuItem>)}
                        </ThemedTextField>
                    </Grid>
                    <InvoiceParamGeneralInfo
                        register={(name, params) => register(name, params)}
                        setDateInterval={(d) => setDateInterval(d)}
                        classes={classes} />
                    <Typography className={classes.sectionTitle}>
                        Items
                    </Typography>

                    {fields.map((field, index) =>
                        <InvoiceItem key={field.id}
                            index={index}
                            remove={(i) => remove(i)}
                            register={(name, params) => register(name, params)}
                            classes={classes}
                        />
                    )}

                </form>
                <Grid item xs={12} alignItems="start">
                    <IconButton
                        color="primary"
                        onClick={() =>
                        {
                            append({})
                        }}>
                        <Add />
                    </IconButton>
                </Grid>
                <Box mt={1} display="flex" justifyContent="space-between">
                    <Box mr={2} >
                        <ThemedButton
                            variant="outlined"
                            buttonStyle={{ type: 'primary' }}
                            fullWidth={false}
                            form="fatureForm"
                            type="submit">
                            Submit
                        </ThemedButton>
                    </Box>
                    {/* } */}
                    <ThemedButton
                        buttonStyle={{ type: 'secondary' }}
                        variant="outlined"
                        fullWidth={false}
                        onClick={() =>
                        {
                            if (isValid) {
                                let tmp = {};
                                const values = getValues();
                                const invoiceTemplate = invoiceTemplates.find((template) => template.id === values.invoiceTemplate);
                                tmp = {
                                    image: `${IMAGE_ENDPOINT}/${invoiceTemplate.image}`,
                                    invoiceType: invoiceTemplate.invoiceType,
                                    generalInfo: {
                                        ref: values.ref,
                                        clientCode: values.clientCode,
                                        ...dateInterval
                                    },
                                    sender: invoiceTemplate.sender,
                                    receiver: {
                                        entreprise: data.entreprise,
                                        address: data.address,
                                        city: data.city,
                                        matFis: data.matFisc,
                                    },
                                    additionalInfo: invoiceTemplate.additionalInfo,
                                    items: values.items
                                };
                                setPreviewData(tmp);
                                setDialOpen(true);
                            }
                        }}>
                        Preview
                    </ThemedButton>
                </Box>
                <InvoicePreviewDial
                    open={dialOpen}
                    onClose={() => { setDialOpen(false) }}
                    page={page}
                    invoice={previewData}
                    setPage={setPage} />
            </Paper>
        </Box>
    </Grid>
}

export default InvoiceCreate;