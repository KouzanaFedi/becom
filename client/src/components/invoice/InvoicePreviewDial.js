import { CircularProgress, Dialog, DialogContent, Paper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { invoiceScale } from "../../redux/ui/invoiceUiSlice";
import PDFViewer from "../../utils/PDFViewer";
import InvoicePageNavigation from "./InvoicePageNavigation";
import InvoiceView from "./InvoiceView";
import ItemsMock from "./ItemsMock";

const useStyles = makeStyles(() => ({
    emptyPDF: ({ invoiceScaleVal }) => ({
        width: `${595 * invoiceScaleVal}px`,
        height: `${842 * invoiceScaleVal}px`,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    }),
}));

const InvoicePreviewDial = ({ open, onClose, page, invoice, setPage }) =>
{
    const invoiceScaleVal = useSelector(invoiceScale);
    const classes = useStyles({ invoiceScaleVal });
    const [instance, update] = usePDF({ document: <InvoiceView invoice={invoice} /> });

    useEffect(() =>
    {
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice])
    return <Dialog open={open} onClose={onClose} maxWidth='md'>
        <DialogContent>
            <InvoicePageNavigation
                page={page}
                setPage={setPage} />
            <Paper className={classes.emptyPDF}>
                <ItemsMock update={update} invoice={invoice} />
                {instance.url === null ? <CircularProgress /> : <PDFViewer file={instance} page={page} />}
            </Paper>
        </DialogContent>
    </Dialog>
}

export default InvoicePreviewDial;