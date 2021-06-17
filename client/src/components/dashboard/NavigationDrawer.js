import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER, uiDrawerState, PIN_DRAWER, UNPIN_DRAWER } from "../../redux/ui/drawerReducer";
import { ChevronLeft, ChevronRight, ExitToApp } from '@material-ui/icons/';
import { ListItems } from "./ListItems";
import logo from "../../assets/comguru-logo-white.png";

import clsx from 'clsx';
import { AUTH_TOKEN } from "../../utils/constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        position: 'relative'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8),
        },
        overflowX: "clip"
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    drawer: {
        background: 'linear-gradient(135deg, rgba(223,49,69,1) 0%, rgba(123,33,125,1) 100%)',
        overflowX: 'hidden',
        borderRight: 'none'
    },
    logo: {
        width: '48px',
        height: '48px',
    },
    whiteDivider: {
        backgroundColor: 'white',
        opacity: '0.2'
    },
    whiteLogo: {
        color: 'white', paddingLeft: '4px'
    },
    whiteFont: {
        color: 'white'
    },
    pin: {
        margin: '6px',
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'white'
    }
}));

const NavigationDrawer = () =>
{
    const classes = useStyles();
    const drawerState = useSelector(uiDrawerState);
    const dispatch = useDispatch();

    const handleDrawerClose = () =>
    {
        dispatch(CLOSE_DRAWER());
    };

    const handleDrawerOpen = () =>
    {
        dispatch(OPEN_DRAWER());
    };

    const handlePinDrawer = () =>
    {
        dispatch(PIN_DRAWER());
    };

    const handleUnpinDrawer = () =>
    {
        dispatch(UNPIN_DRAWER());
    };

    function handleLogOut()
    {
        handleDrawerClose()
        localStorage.removeItem(AUTH_TOKEN);
        window.location.reload();
    };

    return (
        < Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawer, classes.drawerPaper, !drawerState.open && classes.drawerPaperClose)
            }}
            open={drawerState.open}
            style={{ position: 'relative', overflow: 'visible' }}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
        >
            <div className={classes.toolbarIcon}>
                <img src={logo} alt='logo' className={classes.logo} />
                {drawerState.open &&
                    <div>
                        {drawerState.pinned ?
                            <IconButton size={'small'} className={classes.pin} onClick={handleUnpinDrawer}>
                                <ChevronLeft />
                            </IconButton> :
                            <IconButton size={'small'} className={classes.pin} onClick={handlePinDrawer}>
                                <ChevronRight />
                            </IconButton>}
                    </div>
                }
            </div>
            <Divider className={classes.whiteDivider} />
            <List style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                paddingBottom: 0
            }}>
                <ListItems />

                <div>
                    <Divider className={classes.whiteDivider} />
                    <ListItem button onClick={handleLogOut}>
                        <ListItemIcon className={classes.whiteLogo}>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Logout" className={classes.whiteFont} />
                    </ListItem >
                </div>
            </List>
        </Drawer >)
}

export default NavigationDrawer;