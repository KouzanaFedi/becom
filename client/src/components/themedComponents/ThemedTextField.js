import { TextField } from '@material-ui/core';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
    root: (props) => ({
        minHeight: '40px',
        lineHeight: '20px',
        '& fieldset': {
            borderRadius: props.borderRadius ? `${props.borderRadius}` : '5px',
            borderColor: props.disabled && !props.disabledWithBorder ? 'transparent !important' : 'inherit !important',
        },
        '& legend': {
            width: props.label !== undefined ? 'auto' : 'unset'
        },
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent',
        fontSize: '14px',
        '& .MuiSelect-root': {
            textAlign: 'start'
        },
        '& .MuiInputLabel-outlined': {
            fontSize: props.disbaled ? '16px' : 'inherit',
            color: props.disbaled ? "#0000008A" : "inherit"
        }
    }),
    disabled: {
        color: "black"
    }
});

const ThemedTextField = (props) =>
{
    const classes = useStyles(props);
    const fieldProps = { ...props };
    delete fieldProps.borderRadius;
    delete fieldProps.backgroundColor;
    delete fieldProps.disabledWithBorder;

    return < TextField
        inputProps={props.inputProps}
        InputProps={{
            classes: {
                disabled: classes.disbaled
            }
        }}
        size="small"
        classes={{ root: classes.root }}
        {...fieldProps}
    >
    </TextField >
};


export default ThemedTextField;