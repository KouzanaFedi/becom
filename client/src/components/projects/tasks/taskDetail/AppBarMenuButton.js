import { Button, ClickAwayListener, Grow, MenuList, Paper, Popper } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
    button: {
        height: '100%',
    },
    root: {
        zIndex: '8'
    }
}));

const AppBarMenuButton = ({ buttonContent, menuContent }) =>
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

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() =>
    {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return <div>
        <Button
            className={classes.button}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
        >
            {buttonContent}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} className={classes.root} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {menuContent}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </div>
}

export default AppBarMenuButton;