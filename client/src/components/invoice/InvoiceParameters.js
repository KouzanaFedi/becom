import { Grid, Paper, Typography } from "@material-ui/core";
import { Box, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { invoiceData } from "../../redux/logic/projectManager/invoiceSlice";
import InvoiceParamGeneralInfo from "./invoiceParameters/InvoiceParamGeneralInfo";
import InvoiceParamEntreprise from "./invoiceParameters/InvoiceParamEntrerpise";
import InvoiceParamClient from "./invoiceParameters/InvoiceParamClient";
import InvoiceParamAddInfo from "./invoiceParameters/InvoiceParamAddInfo";
import InvoiceItems from "./invoiceParameters/InvoiceItems";
import ThemedButton from "../themedComponents/ThemedButton";

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
    }
}));

const InvoiceParameters = ({ openDial }) =>
{
    const classes = useStyles();
    const invoice = useSelector(invoiceData);

    return <Paper>
        <Box p={2} className={classes.root}>
            <Typography className={classes.title}>Invoice templates </Typography>
            <InvoiceParamGeneralInfo invoice={invoice} classes={classes} />
            <Grid container spacing={2} justify="center">
                <InvoiceParamEntreprise invoice={invoice} classes={classes} />
                <InvoiceParamClient invoice={invoice} classes={classes} />
            </Grid>
            <InvoiceItems invoice={invoice} classes={classes} />
            <Box mt={2}>
                <InvoiceParamAddInfo invoice={invoice} classes={classes} />
            </Box>
            <ThemedButton
                buttonStyle={{ type: 'primary' }}
                onClick={() =>
                {
                    openDial();
                }}>
                Preview
            </ThemedButton>
        </Box>
    </Paper>
}

export default InvoiceParameters;