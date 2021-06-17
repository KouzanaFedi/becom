import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Color from 'color';

const useStyles = makeStyles(() => ({
    root: (props) =>
    ({
        borderRadius: 5,
        boxShadow: `0 3px 5px 2px ${Color(props.backgroundColor).white() === 100 ? 'rgb(0, 0, 0, 0.3)' : Color(props.backgroundColor).alpha(.4)}`,
        color: props.fontColor,
        backgroundColor: props.backgroundColor,
        textTransform: 'none',
        height: 40,
        padding: '10px 22px',
        fontSize: "18px",
        width: '100%',
        '&:hover': {
            backgroundColor: Color(props.backgroundColor).alpha(.8).toString(),
        },
        '&:disabled': {
            color: 'white',
            backgroundColor: `${Color(props.backgroundColor).alpha(.6)}`,
            boxShadow: 'none'
        }
    })
}));

function getColorsByType(props)
{
    if (props.type === 'primary') {
        return {
            backgroundColor: '#7B217D',
            fontColor: "#fff"
        }
    } else if (props.type === 'denied') {
        return {
            backgroundColor: '#DF3145',
            fontColor: "#fff"
        }
    } else return {
        backgroundColor: props.backgroundColor,
        fontColor: props.fontColor
    }
}

const ThemedButton = (props) =>
{
    const { buttonStyle } = props;
    const classes = useStyles(getColorsByType(buttonStyle));
    const buttonProps = { ...props };
    delete buttonProps.buttonStyle;
    return <Button {...buttonProps} className={classes.root} ></Button>;
}

export default ThemedButton;