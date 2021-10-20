import { Accordion, AccordionSummary, Typography, AccordionDetails, AccordionActions, Box } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import makeStyles from '@material-ui/styles/makeStyles';
import ThemedButton from "../../themedComponents/ThemedButton";
import moment from "moment";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#BECCBE",
    },
    content: ({ fullScreen }) => ({
        backgroundColor: "#EFE",
        maxHeight: fullScreen ? 'inherit' : '250px',
        overflowY: 'auto',
    }),
    title: {
        textAlign: "start",
        fontWeight: 600,
    },
    textContent: {
        textAlign: 'start',
        marginBottom: "10px",
        fontSize: ".9em",
    },
    info: {
        textAlign: 'end',
        fontSize: ".75em",
        color: "#444",
        marginBottom: "10px",
        marginLeft: '10px'
    },
    clientInfo: {
        fontSize: ".8em",
        margin: "10px"
    }
}));

const InvoiceRequestGroup = ({ data, setCreateInv, fullScreen }) =>
{
    const classes = useStyles({ fullScreen });

    return <Accordion elevation={0} className={classes.root}>
        <AccordionSummary
            expandIcon={!fullScreen && <ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography ><b>{data.title}</b></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
            <Typography className={classes.info}>
                Request sent by <b>{data.client.name}</b>, {new moment(new Date(parseInt(data.createdAt))).format("LL")}
            </Typography>
            <Typography className={classes.title}>
                Client information
            </Typography>
            <Box className={classes.clientInfo}>
                <Box display="flex" columnGap="10px" flexWrap="wrap">
                    <span >
                        <b>Entreprise name:</b>
                    </span>
                    <span >
                        {data.entreprise}
                    </span>
                </Box>
                <Box display="flex" columnGap="10px" flexWrap="wrap">
                    <span >
                        <b>Address:</b>
                    </span>
                    <span >
                        {data.address}
                    </span>
                </Box>
                <Box display="flex" columnGap="10px" flexWrap="wrap">
                    <span >
                        <b> City:</b>
                    </span>
                    <span >
                        {data.city}
                    </span>
                </Box>
                <Box display="flex" columnGap="10px" flexWrap="wrap">
                    <span >
                        <b>Register tax:</b>
                    </span>
                    <span >
                        {data.matFisc}
                    </span>
                </Box>
            </Box>
            <Typography className={classes.title}>
                Description
            </Typography>
            <Typography className={classes.textContent}>
                {data.description}
            </Typography>
            <Typography className={classes.title}>
                Request items
            </Typography>
            {data.items.length > 0 && <ul>
                {data.items.map((item) => <li className={classes.textContent} key={item._id}>
                    <b>{item.type ? item.type.name : "Custom request"}: </b>{item.text}
                </li>)}
            </ul>}
        </AccordionDetails>
        {
            !fullScreen && <AccordionActions>
                <ThemedButton
                    fullWidth={false}
                    variant="outlined"
                    buttonStyle={{ type: 'primary' }}
                    onClick={() =>
                    {
                        setCreateInv(data._id)
                    }}
                >
                    Create invoice
                </ThemedButton>
            </AccordionActions>
        }
    </Accordion >
}

export default InvoiceRequestGroup;