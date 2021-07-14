import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: (props) => ({
        minHeight: '40px',
        lineHeight: '20px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: props.borderRadius ? `${props.borderRadius}` : '5px',
            },
            backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent',
            fontSize: '14px',
        },
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
        variant="outlined"
        size="small"
        classes={{ root: classes.root }}
        {...fieldProps}
    >
    </TextField >
};


export default ThemedTextField;