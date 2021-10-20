import { Grid, Switch, MenuItem, Box, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { Fragment, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { invoiceAdditionalTabData } from "../../redux/ui/invoiceUiSlice";
import ThemedButton from "../themedComponents/ThemedButton";
import ThemedTextField from "../themedComponents/ThemedTextField";
import InvoiceParamAddInfo from "./invoiceParameters/InvoiceParamAddInfo";
import InvoiceParamEntreprise from "./invoiceParameters/InvoiceParamEntrerpise";
import InvoicePreviewDial from "./InvoicePreviewDial";
import { Close } from "@material-ui/icons";
import { invoiceEditTabData, invoiceTemplatesImagesData, UPDATE_INVOICE_TEMPLATE_EDIT_DATA } from "../../redux/logic/projectManager/invoiceSlice";
import { IMAGE_ENDPOINT } from "../../config";
import { useMutation } from "@apollo/client";
import { CREATE_INVOICE_TEMPLATES, UPDATE_INVOICE_TEMPLATES } from "../../api/invoice";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '24px'
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomMargin: {
        marginBottom: '16px',
        width: '100%'
    },
    logo: {
        width: '100px',
        marginLeft: '15px',
        marginBottom: '15px'
    },
    parties: {
        display: 'flex',
        flexDirection: 'row',
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
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    customLabel: {
        textAlign: 'start'
    },
    marginTop: {
        marginTop: '5px'
    },
    images: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    space: {
        marginBottom: '15px',
        display: 'none'
    },
    uploadBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '15px 0',
        width: '100%'
    },
    label: {
        marginBottom: '0px',
        marginRight: '15px'
    },
    marginRight: {
        marginRight: '5px'
    }
}));


const TemplateEdit = () =>
{
    const classes = useStyles();
    const [newValues, setNewValues] = useState({});

    const invoicTemplateData = useSelector(invoiceEditTabData);
    const [previewData, setPreviewData] = useState({});
    const { handleSubmit, register, formState: { errors, isValid }, control, setValue, setError, getValues, reset } = useForm({
        defaultValues: useMemo(() =>
        {
            return invoicTemplateData;
        }, [invoicTemplateData])
    });

    useEffect(() =>
    {
        register('imageUpload');
        setValue('imageUpload', null);
        for (const [key, value] of Object.entries(invoicTemplateData)) {
            setValue(key, value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoicTemplateData]);

    const dispatch = useDispatch();
    const [dialOpen, setDialOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [page, setPage] = useState(1);

    const data = useSelector(invoiceAdditionalTabData);
    const invoiceTemplatesImages = useSelector(invoiceTemplatesImagesData);
    const [useLocalImage, setUseLocalImage] = useState(false);

    const handleSwitchChange = (event) =>
    {
        setUseLocalImage(event.target.checked);
    };
    const [updateInvoiceTemplateQuery, { loading: loadingUpdate }] = useMutation(UPDATE_INVOICE_TEMPLATES, {
        onCompleted: ({ updateInvoiceTemplate }) =>
        {
            setNewValues({ ...newValues, ...updateInvoiceTemplate });
            dispatch(UPDATE_INVOICE_TEMPLATE_EDIT_DATA({ data: { ...newValues, ...updateInvoiceTemplate }, mode: data.mode }));
        }
    });

    const [createInvoiceTemplateQuery, { loading: createLoading }] = useMutation(CREATE_INVOICE_TEMPLATES, {
        onCompleted: ({ createInvoiceTemplate }) =>
        {
            setNewValues({ ...newValues, ...createInvoiceTemplate });
            dispatch(UPDATE_INVOICE_TEMPLATE_EDIT_DATA({ data: { ...newValues, ...createInvoiceTemplate }, mode: data.mode }));
        }
    });

    const submit = (data) =>
    {
        let res = { ...data };
        if (useLocalImage) {
            res = { ...res, imageUpload: imageSelected, image: null, id: invoicTemplateData.id };
        } else {
            res = { ...res, imageUpload: null, id: invoicTemplateData.id };
        }

        try {
            res.sender.phone = parseInt(res.sender.phone);
        } catch (error) {
            setError('sender.phone', { message: "Invalide format." }, { shouldFocus: true });
        }
        if (isValid) {
            setNewValues({ ...res });
            if (data.mode === 'edit') {
                console.log(res);
                updateInvoiceTemplateQuery({ variables: { ...res } });
            }
            else {
                delete res.id;
                createInvoiceTemplateQuery({ variables: { ...res } });
                reset();
            }
        }
    }

    return (
        <Paper elevation={4}>
            < form onSubmit={handleSubmit(submit)} >
                <Box p={2} className={classes.root}>
                    <Typography className={classes.title}>Create invoice template </Typography>
                    <Typography className={classes.sectionTitle}>General</Typography>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} className={classes.root}>
                            <ThemedTextField
                                className={classes.bottomMargin + ' ' + classes.marginTop}
                                borderRadius="5px"
                                backgroundColor='#EFE'
                                label='Template name'
                                inputProps={register('templateName', { required: 'Required field.' })}
                                error={errors?.templateName !== undefined}
                                helperText={errors?.templateName !== undefined && errors.templateName.message}
                            />
                            <ThemedTextField
                                className={classes.bottomMargin}
                                borderRadius="5px"
                                backgroundColor='#EFE'
                                label='Invoice type'
                                select
                                inputProps={register('invoiceType')}
                                defaultValue={'devis'}
                            >
                                <MenuItem value='devis'>
                                    Devis
                                </MenuItem>
                                <MenuItem value='facture'>
                                    Facture
                                </MenuItem>
                            </ThemedTextField>
                        </Grid>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Already used logo</Grid>
                                <Grid item>
                                    <Switch
                                        checked={useLocalImage}
                                        onChange={handleSwitchChange}
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                                <Grid item>Local logo</Grid>
                            </Grid>
                        </Typography>
                        {!useLocalImage ? <Grid item xs={12}>
                            <Box mt={2}>
                                <Controller
                                    rules={{ required: true }}
                                    control={control}
                                    name="image"
                                    render={({ field: { name, onBlur, onChange, value } }) => (
                                        <RadioGroup
                                            className={classes.images}
                                            name={name}
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={(e) =>
                                            {
                                                onChange(e);
                                            }}
                                        >
                                            {invoiceTemplatesImages.map((image, key) => <FormControlLabel
                                                key={key}
                                                value={`${image}`}
                                                control={<Radio />}
                                                label={
                                                    <Fragment>
                                                        <img src={`${IMAGE_ENDPOINT}/${image}`} alt="sup"
                                                            width="40px"
                                                            height="auto"
                                                            className={classes.marginRight}
                                                        />
                                                    </Fragment>
                                                }
                                            />)}
                                        </RadioGroup>
                                    )}
                                />
                            </Box>
                        </Grid> : <div className={classes.uploadBtn}>
                            <input
                                accept="image/*"
                                className={classes.space}
                                id="contained-button-file"
                                type="file"
                                onChange={(event) =>
                                {
                                    setValue('imageUpload', event.target.files[0]);
                                    setImageSelected(event.target.files[0]);
                                }} />
                            <label className={classes.label} htmlFor="contained-button-file">
                                <Button variant="outlined" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                            <Typography>{imageSelected !== null ? imageSelected.name : "No image selected."}</Typography>
                            {imageSelected ?
                                <Button
                                    onClick={() =>
                                    {
                                        setValue('imageUpload', null);
                                        setImageSelected(null);
                                    }}>
                                    <Close />
                                </Button> :
                                <div />}
                        </div >}
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} className={classes.root}>
                            <InvoiceParamEntreprise
                                web={register('sender.web', { required: 'Required field.' })}
                                email={register('sender.email', { required: 'Required field.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Wrong format.' } })}
                                phone={register('sender.phone', {
                                    required: 'Required field.', pattern: { value: /^[0-9]+/, message: 'Wrong format.' }, minLength: { value: 8, message: 'Minimum of 8 numbers.' }
                                })}
                                street={register('sender.street', { required: 'Required field.' })}
                                address={register('sender.address', { required: 'Required field.' })}
                                entreprise={register('sender.entreprise', { required: 'Required field.' })}
                                errors={errors}
                                classes={classes}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <InvoiceParamAddInfo
                            country={register('additionalInfo.country', { required: 'Required field.' })}
                            type={register('additionalInfo.entrepriseType', { required: 'Required field.' })}
                            register={register('additionalInfo.rc', { required: 'Required field.' })}
                            matFis={register('additionalInfo.matFisc', { required: 'Required field.' })}
                            errors={errors}
                            classes={classes}
                        />
                    </Box>
                    <Box mt={1} className={classes.actions}>
                        {data.mode === 'edit' ?
                            <ThemedButton
                                variant="outlined"
                                buttonStyle={{ type: 'primary' }}
                                fullWidth={false}
                                type="submit"
                                onClick={() => { }}>
                                {loadingUpdate ? <CircularProgress color="primary"
                                    size={24} /> : 'Download'}
                            </ThemedButton> :
                            <ThemedButton
                                variant="outlined"
                                buttonStyle={{ type: 'primary' }}
                                fullWidth={false}
                                type="submit"
                                onClick={() => { }}>
                                {createLoading ? <CircularProgress color="primary"
                                    size={24} /> : 'Create'}
                            </ThemedButton>}
                        <ThemedButton
                            buttonStyle={{ type: 'secondary' }}
                            variant="outlined"
                            fullWidth={false}
                            onClick={() =>
                            {
                                const values = getValues();
                                if (values.imageUpload !== null && useLocalImage) {
                                    values.image = URL.createObjectURL(values.imageUpload);
                                } else if (values.image !== null) {
                                    values.image = `${IMAGE_ENDPOINT}/${values.image}`
                                }
                                setPreviewData(values);
                                setDialOpen(true);
                            }}>
                            Preview
                        </ThemedButton>
                    </Box>
                </Box>
            </form >
            <InvoicePreviewDial
                open={dialOpen}
                onClose={() => { setDialOpen(false) }}
                page={page}
                invoice={previewData}
                setPage={setPage} />
        </Paper >
    );
}

export default TemplateEdit;