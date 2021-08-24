import { useQuery } from "@apollo/client";
import { CssBaseline, Grid, } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { INVOICE_TEMPLATES } from "../../api/invoice";
import { INIT_INVOICE_TEMPLATE } from "../../redux/logic/projectManager/invoiceSlice";
import { SET_INVOICE_ACTIVE_TAB } from "../../redux/ui/invoiceUiSlice";
import { INVOICE_SECTIONS } from "../../routers/InvoiceSections";
import InvoiceMenu from "./InvoiceMenu";

const Invoice = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { subsection } = useParams();

    useQuery(INVOICE_TEMPLATES, {
        onCompleted: ({ invoiceTemplates, invoicesImages }) =>
        {
            dispatch(INIT_INVOICE_TEMPLATE({ invoiceTemplates, invoicesImages }));
        }
    })

    function getSectionComponent(section)
    {
        if (section !== undefined) {
            const res = INVOICE_SECTIONS.find((sec) => sec.name === section);
            if (res === undefined) {
                history.replace('/404');
            } else {
                dispatch(SET_INVOICE_ACTIVE_TAB({ tabType: section.name }));
            }
            return res.component;
        } else return null;
    }

    const InvoiceSection = getSectionComponent(subsection);

    return <Grid container spacing={1} >
        <CssBaseline />
        <Grid item xs={2}>
            <InvoiceMenu />
        </Grid>
        {InvoiceSection ? < InvoiceSection /> : <></>}
    </Grid >
}

export default Invoice;