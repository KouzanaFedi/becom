import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import
{
    AppBar,
    Toolbar,
    CssBaseline,
    useScrollTrigger,
    Slide,
    Box,
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import Logo from '../../assets/comguru-logo-white.png';
import { ArrowDropDown } from '@material-ui/icons';
import { Fragment } from 'react';
import ThemedMenu from './ThemedMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        height: '40px',
        maxHeight: '40px',
    },
    content: {
        display: 'flex',
        height: '40px',
        alignItems: 'center'
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        color: '#fff',
        paddingLeft: '0',
        '&:focus': {
            outline: 'none'
        },
        '&:hover': {
            backgroundColor: 'inherit'
        },
    },
    paper: {
        overflowX: "unset",
        overflowY: "unset",
        "&::before": {
            content: '""',
            position: "absolute",
            marginLeft: "1em",
            marginTop: '-5px',
            top: 0,
            left: 20,
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            transform: "translate(-50%, 50%) rotate(-45deg)",
            clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
        },
        marginTop: '5px',
    },
    sectionName: {
        marginLeft: '5px',
        fontSize: "20px",
        fontFamily: 'Dancing Script',
        fontWeight: '600'
    },
    logo: {
        padding: '3px 0px'
    },
    popper: {
        top: '45px !important',
        left: '5px !important'
    }
}));

function HideOnScroll(props)
{
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const ThemedAppBar = (props) =>
{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () =>
    {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) =>
    {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event)
    {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() =>
    {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function getSectionName(name)
    {
        return name[0].toUpperCase() + name.substring(1);
    }

    return (
        <Fragment >
            <CssBaseline />
            <Popper
                className={classes.popper}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition>
                <Paper classes={{ root: classes.paper }}>
                    <ClickAwayListener onClickAway={handleClose} >
                        <div> {/*Avoid "Invalid prop `children` supplied to `ClickAwayListener`. Expected an element that can hold a ref. Did you accidentally use a plain function component for an element instead?" */}
                            <ThemedMenu small open={open} close={() => setOpen(false)} handleListKeyDown={handleListKeyDown} />
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
            <HideOnScroll {...props} >
                <AppBar className={classes.root} elevation={0} >
                    <Box className={classes.content} ml={1}>
                        <Box className={classes.menu}>
                            {props.type === 'menu' ? <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                disableRipple
                                className={classes.menuButton}
                            >
                                <img className={classes.logo} alt="logo" src={Logo} height="36px" />
                                {props.name && <Typography className={classes.sectionName}>{getSectionName(props.name)}</Typography>}
                                <ArrowDropDown />
                            </Button> : <img className={classes.logo} alt="logo" src={Logo} height="36px" />}
                        </Box>
                    </Box>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </Fragment>
    );
}

export default ThemedAppBar;