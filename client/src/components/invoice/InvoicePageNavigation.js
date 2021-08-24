import { Box, CircularProgress, IconButton, Paper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoicePages } from "../../redux/logic/projectManager/invoiceSlice";
import { SET_INVOICE_SCALE } from "../../redux/ui/invoiceUiSlice";

const useStyles = makeStyles(() => ({
    blankSpace: {
        width: '48px',
        height: '48px',
    },
    pagesNavigation: {
        fontWeight: 'bold',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSize: {
        width: '50%'
    }
}));

const InvoicePageNavigation = ({ page, setPage }) =>
{
    const classes = useStyles();
    const pdfPages = useSelector(invoicePages);
    const ref = useRef(null);
    const dispatch = useDispatch();

    useLayoutEffect(() =>
    {
        function updateScale()
        {
            dispatch(SET_INVOICE_SCALE({ invoiceScale: ref.current.clientWidth / 595 }))
        }
        window.addEventListener('resize', updateScale);
        updateScale()
        return () => window.removeEventListener('resize', updateScale);
    }, [ref, dispatch])

    return (
        <Box mb={1}>
            <Paper ref={ref} className={classes.root}>
                {pdfPages === null ? <CircularProgress size='24px' /> : <div className={classes.pagesNavigation}>
                    {page !== 1 ? <IconButton
                        onClick={() =>
                        {
                            if (page > 1) {
                                setPage(page - 1)
                            }
                        }}
                        size="large">
                        <ArrowLeft />
                    </IconButton> :
                        <div className={classes.blankSpace} />}
                    {page} / {pdfPages}
                    {page < pdfPages ? <IconButton
                        onClick={() =>
                        {
                            if (page < pdfPages) {
                                setPage(page + 1)
                            }
                        }}
                        size="large">
                        <ArrowRight />
                    </IconButton> : <div className={classes.blankSpace} />}
                </div>}
            </Paper>
        </Box>
    );
}

export default InvoicePageNavigation;