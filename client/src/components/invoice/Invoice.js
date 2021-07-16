import { useQuery } from "@apollo/client";
import { Box, CssBaseline, Grid, makeStyles, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { INVOICE_TEMPLATES } from "../../api/invoice";
import { INIT_INVOICE_TEMPLATE } from "../../redux/logic/projectManager/invoiceSlice";
import { invoiceUIData } from "../../redux/ui/invoiceUiSlice";
import InvoiceArchive from "./InvoiceArchive";
import InvoiceMenu from "./InvoiceMenu";
import InvoiceRequests from "./InvoiceRequests";
import InvoiceTemplates from "./InvoiceTemplates";
import TemplateEdit from "./TemplateEdit";

const useStyles = makeStyles(() => ({
    blankSpace: {
        width: '48px',
    },
    pagesNavigation: {
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    fixOverflow: {
        overflowY: 'auto',
        height: 'auto',
        maxHeight: 'calc(100vh - 40px)',
        marginTop: '4px',
        marginBottom: '4px',
    }
}));

const Invoice = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const invoiceUIdata = useSelector(invoiceUIData);

    useQuery(INVOICE_TEMPLATES, {
        onCompleted: ({ invoiceTemplates, invoicesImages }) =>
        {
            dispatch(INIT_INVOICE_TEMPLATE({ invoiceTemplates, invoicesImages }));
        }
    })

    function getActiveTabElement()
    {
        const tab = invoiceUIdata.activeTab;
        if (tab === 'invoice_templates') return <InvoiceTemplates />
        else if (tab === 'invoice_requests') return <InvoiceRequests />
        else if (tab === 'template_archive') return <InvoiceArchive />
        else return <></>
    }

    function getAdditionalTabElement()
    {
        const tab = invoiceUIdata.additionalTab;
        if (tab === 'template_edit') return <TemplateEdit />
        else return <></>
    }

    return <Grid container spacing={1} >
        <CssBaseline />
        <Grid item xs={2}>
            <InvoiceMenu />
        </Grid>
        <Grid item xs={5} className={classes.fixOverflow}>
            <Box my={0.5}>
                {getActiveTabElement()}
            </Box>
        </Grid>
        <Grid item xs={5} className={classes.fixOverflow}>
            <Box my={0.5}>
                {getAdditionalTabElement()}
            </Box>
        </Grid>
    </Grid >
}

export default Invoice;