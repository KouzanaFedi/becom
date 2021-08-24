import { Tooltip } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: '#DBC15699',
        color: theme.palette.text.primary,
        maxWidth: 220,
        fontSize: '14px',
        border: '1px solid #DBC156',
    },
    arrow: {
        color: '#DBC156',
    },
}));

const ThemedTooltip = forwardRef((props, ref) =>
{
    const classes = useStyles();
    return <Tooltip
        {...props}
        ref={ref}
        classes={{
            tooltip: classes.tooltip,
            arrow: classes.arrow
        }}
        open={props.open()}
        title={props.title()}
    />
});

export default ThemedTooltip;