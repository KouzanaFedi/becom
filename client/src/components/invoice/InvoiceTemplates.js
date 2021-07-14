import { Button, Dialog, DialogContent } from "@material-ui/core";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoiceTemplatesData, RESET_INVOICE_TEMPLATE_EDIT_DATE } from "../../redux/logic/projectManager/invoiceSlice";
import { SET_INVOICE_ADDITIONAL_TAB } from "../../redux/ui/invoiceUiSlice";
import TemplateCard from "./invoiceTemplates/TemplateCard";

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
    }
}));

const InvoiceTemplates = () =>
{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const invoiceTemplates = useSelector(invoiceTemplatesData);

    return <Paper>
        <Box py={2} px={4}>
            <Typography className={classes.title}>
                Invoice templates
            </Typography>
            <Box className={classes.root}>
                {
                    invoiceTemplates.map((invoice, key) => <TemplateCard key={key} classes={classes} setOpen={() => { setOpen(true) }} data={invoice} />)
                }
            </Box>
            <Button
                className={classes.newTemplate}
                onClick={() =>
                {
                    dispatch(RESET_INVOICE_TEMPLATE_EDIT_DATE());
                    dispatch(SET_INVOICE_ADDITIONAL_TAB({ additionalTab: 'template_edit', data: { mode: 'create' } }));
                }}
            >
                New template
            </Button>
        </Box>
        <Dialog fullWidth open={open} onClose={() => { setOpen(false) }}>
            <DialogContent>
                BRERERER
            </DialogContent>
        </Dialog>
    </Paper>
}

export default InvoiceTemplates;