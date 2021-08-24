import { TextField } from '@material-ui/core';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
    root: (props) => ({
        minHeight: '40px',
        lineHeight: '20px',
        '& fieldset': {
            borderRadius: props.borderRadius ? `${props.borderRadius}` : '5px',
        },
        '& legend': {
            width: props.label !== undefined ? 'auto' : 'unset'
        },
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent',
        fontSize: '14px',
        '& .MuiSelect-root': {
            textAlign: 'start'
        }
    })
});

const ThemedTextField = (props) =>
{
    const classes = useStyles(props);
    const fieldProps = { ...props };
    delete fieldProps.borderRadius;
    delete fieldProps.backgroundColor;

    return < TextField
        inputProps={props.inputProps}
        size="small"
        classes={{ root: classes.root }}
        {...fieldProps}
    >
    </TextField >
};


export default ThemedTextField;