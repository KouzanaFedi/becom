import { Box, makeStyles, MenuItem, MenuList, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SET_INVOICE_ACTIVE_TAB } from "../../redux/ui/invoiceUiSlice";
import archive from '../../assets/icons/archive.png'
import template from '../../assets/icons/template.png'
import request from '../../assets/icons/request.png'

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
    }
}));
const InvoiceMenu = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    return <Box className={classes.root}>
        <MenuList>
            <MenuItem
                button
                onClick={() =>
                {
                    dispatch(SET_INVOICE_ACTIVE_TAB({ tabType: 'invoice_requests' }));
                }}>
                <img className={classes.icon} src={request} alt='icon' /> <Typography>Requests</Typography>
            </MenuItem>
            <MenuItem
                button
                onClick={() =>
                {
                    dispatch(SET_INVOICE_ACTIVE_TAB({ tabType: 'invoice_templates' }));
                }}>
                <img className={classes.icon} src={template} alt='icon' /> <Typography>Template</Typography>
            </MenuItem>
            <MenuItem
                button
                onClick={() =>
                {
                    dispatch(SET_INVOICE_ACTIVE_TAB({ tabType: 'template_archive' }));
                }}>
                <img className={classes.icon} src={archive} alt='icon' /> <Typography>Archive</Typography>
            </MenuItem>
        </MenuList>
    </Box>
}

export default InvoiceMenu;