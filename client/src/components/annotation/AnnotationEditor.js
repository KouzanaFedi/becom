import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import ThemedButton from "../themedComponents/ThemedButton";
import ThemedTextField from "../themedComponents/ThemedTextField";


const useStyles = makeStyles(() => ({
    root: ({ geometry }) => ({
        zIndex: 9999999,
        position: "absolute !important",
        top: `${geometry.y + geometry.height}% !important`,
        left: `${geometry.x}% !important`,
        backgroundColor: '#FFF',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12);',
        borderRadius: '5px',
        marginTop: '8px',
        padding: '16px 8px 8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px'
    }),
    textArea: {
        fontSize: '16px',
    },
    title: {
        fontWeight: 700,
        fontSize: '14px'
    }
}));

const AnnotationEditor = ({ annotation, onChange, onSubmit }) =>
{
    const { geometry } = annotation;
    const classes = useStyles({ geometry });
    const { register, formState: { errors }, handleSubmit } = useForm();

    if (!geometry) return null;

    function submit({ description })
    {
        onChange({
            ...annotation,
            data: {
                ...annotation.data,
                text: description,
                id: Math.floor(Math.random() * 10000)
            }
        })
        onSubmit();
    }

    return <Fragment>
        <form onSubmit={handleSubmit(submit)} className={classes.root}>
            <Typography className={classes.title} >
                Add a note
            </Typography>
            <ThemedTextField
                fullWidth
                multiline
                label="Description"
                maxRows={4}
                className={classes.textArea}
                error={errors?.updateDescription !== undefined}
                helperText={errors?.updateDescription !== undefined && errors.updateDescription.message}
                inputProps={register('description', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
            />
            <ThemedButton
                buttonStyle={{ type: "secondary" }}
                className={classes.button}
                variant="outlined"
                type="submit"
            >
                Send
            </ThemedButton>
        </form>
    </Fragment>
}

export default AnnotationEditor;