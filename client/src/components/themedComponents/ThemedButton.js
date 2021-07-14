import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Color from 'color';

const useStyles = makeStyles(() => ({
    root: ({ buttonStyle, fullWidth, variant }) =>
    ({
        borderRadius: 5,
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        color: variant === "contained" ? buttonStyle.fontColor : buttonStyle.backgroundColor,
        backgroundColor: variant === "contained" ? buttonStyle.backgroundColor : `${Color(buttonStyle.backgroundColor).alpha(.3)}`,
        border: variant === "contained" ? 'none' : `1px solid ${buttonStyle.backgroundColor}`,
        textTransform: 'unset',
        height: 40,
        padding: '10px 22px',
        fontSize: "14px",
        fontWeight: variant === "contained" ? 'regular' : 'bold',
        width: fullWidth ? '100%' : 'auto',
        '&:hover': {
            backgroundColor: variant === "contained" ? Color(buttonStyle.backgroundColor).alpha(.8).toString() : Color(buttonStyle.backgroundColor).alpha(.3).toString(),
            border: variant === "contained" ? 'none:' : `2px solid ${buttonStyle.backgroundColor}`
        },
        '&:disabled': {
            opacity: 0.3
        }
    })
}));

function getColorsByType(props)
{
    if (props.type === 'primary') {
        return {
            backgroundColor: '#7B217D',
            fontColor: "#fff"
        };
    } else if (props.type === 'denied') {
        return {
            backgroundColor: '#DF3145',
            fontColor: "#fff"
        };
    } else if (props.type === 'secondary') {
        return {
            backgroundColor: '#AE2960',
            fontColor: "#fff"
        };
    } else return {
        backgroundColor: props.backgroundColor,
        fontColor: props.fontColor
    }
}

const ThemedButton = (props) =>
{
    const { buttonStyle, fullWidth = true, variant = "contained" } = props;
    const classes = useStyles({ buttonStyle: getColorsByType(buttonStyle), fullWidth, variant });
    const buttonProps = { ...props };
    delete buttonProps.buttonStyle;
    return <Button  {...buttonProps} className={classes.root} ></Button>;
}

export default ThemedButton;