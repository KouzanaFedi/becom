import { Button, Grid } from "@material-ui/core";
import { Box, Typography, Paper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoiceTemplatesData, RESET_INVOICE_TEMPLATE_EDIT_DATA } from "../../redux/logic/projectManager/invoiceSlice";
import { invoiceAdditionalTabData, SET_INVOICE_ADDITIONAL_TAB } from "../../redux/ui/invoiceUiSlice";
import TemplateCard from "./invoiceTemplates/TemplateCard";
import TemplateEdit from "./TemplateEdit";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '24px'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardRoot: {
        width: '40%',
        marginBottom: '20px'
    },
    cardMedia: {
        objectFit: 'contain',
        paddingTop: '15px',
    },
    newTemplate: {
        color: theme.palette.third.main
    },
    fixOverflow: {
        overflowY: 'auto',
        height: 'auto',
        maxHeight: 'calc(100vh - 40px)',
        marginTop: '4px',
        marginBottom: '4px',
    }
}));

const InvoiceTemplates = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const additionalTab = useSelector(invoiceAdditionalTabData);

    const invoiceTemplates = useSelector(invoiceTemplatesData);

    useEffect(() =>
    {
        return () => { dispatch(SET_INVOICE_ADDITIONAL_TAB({ additionalTab: null, data: null })); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <Grid item xs={5} className={classes.fixOverflow}>
            <Box my={0.5}>
                <Paper elevation={4}>
                    <Box py={2} px={4}>
                        <Typography className={classes.title}>
                            Invoice templates
                        </Typography>
                        <Box className={classes.root}>
                            {
                                invoiceTemplates.map((invoice, key) => <TemplateCard key={key} classes={classes} data={invoice} />)
                            }
                        </Box>
                        <Button
                            className={classes.newTemplate}
                            onClick={() =>
                            {
                                dispatch(RESET_INVOICE_TEMPLATE_EDIT_DATA());
                                dispatch(SET_INVOICE_ADDITIONAL_TAB({ additionalTab: 'template_edit', data: { mode: 'create' } }));
                            }}
                        >
                            New template
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Grid>
        <Grid item xs={5} className={classes.fixOverflow}>
            <Box my={0.5}>
                {additionalTab !== null && < TemplateEdit />}
            </Box >
        </Grid>
    </>
}

export default InvoiceTemplates;