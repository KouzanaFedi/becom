import { Box, MenuItem, MenuList, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SET_INVOICE_ACTIVE_TAB } from "../../redux/ui/invoiceUiSlice";
import { INVOICE_SECTIONS } from "../../routers/InvoiceSections";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 40px)',
        backgroundColor: '#EFE',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    icon: {
        width: '20px',
        marginRight: '20px',
        color: theme.palette.text
    },
    link: {
        color: 'unset',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    title: {
        fontWeight: '500'
    }
}));
const InvoiceMenu = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    return <Box className={classes.root}>
        <MenuList>
            {INVOICE_SECTIONS.map((section, key) => <Link
                key={key}
                to={`${section.url}`}
                className={classes.link}
                onClick={() =>
                {
                    dispatch(SET_INVOICE_ACTIVE_TAB({ tabType: section.name }));
                }}>
                <MenuItem button>
                    <img className={classes.icon} src={section.icon} alt='icon' /> <Typography className={classes.title}>{section.title}</Typography>
                </MenuItem>
            </Link>)}
        </MenuList>
    </Box >
}

export default InvoiceMenu;