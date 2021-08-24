import { useMutation } from "@apollo/client";
import { Dialog, DialogActions, DialogContent, Button, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_PROFILE_IMG } from "../api/auth";
import ThemedButton from "../components/themedComponents/ThemedButton";
import { SET_PROFILE_IMG } from "../redux/logic/userSlice";
import ThemedAvatar from "./themedComponents/ThemedAvatar";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    space: {
        marginBottom: '15px',
        display: 'none'
    },
    uploadBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        marginBottom: '0px',
        marginRight: '15px'
    }
}));
const UploadProfileImgDial = ({ open, onClose, name, email, disableBackdropClick, disableEscapeKeyDown }) =>
{
    const classes = useStyles();
    const [newImage, setNewImage] = useState(null);
    const [imageName, setImageName] = useState('No image selected.');

    const dispatch = useDispatch();
    const [updateImageQuery] = useMutation(UPDATE_PROFILE_IMG, {
        onCompleted: ({ uploadProfileImg }) =>
        {
            const { name } = uploadProfileImg;
            dispatch(SET_PROFILE_IMG(name));
            setNewImage(null);
            onClose();
        }
    });

    const handleClose = (event, reason) =>
    {
        if (disableBackdropClick && reason === "backdropClick") {
            return false;
        }

        if (disableEscapeKeyDown && reason === "escapeKeyDown") {
            return false;
        }

        if (typeof onClose === "function") {
            onClose();
        }
    }
    return <Dialog open={open} fullWidth maxWidth='xs' onClose={handleClose} >
        <DialogContent className={classes.root}>
            <div className={classes.uploadBtn}>
                <input
                    accept="image/*"
                    className={classes.space}
                    id="contained-button-file"
                    type="file"
                    onChange={(event) =>
                    {
                        setNewImage(event.target.files[0]);
                        setImageName(event.target.files[0].name + '.');
                    }} />
                <label className={classes.label} htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <Typography>{imageName}</Typography>
            </div >
            <ThemedAvatar type="display" name={name} image={newImage !== null ? URL.createObjectURL(newImage) : null} />
        </DialogContent>
        <DialogActions>
            <ThemedButton
                disabled={newImage === null}
                buttonStyle={{ type: "primary" }}
                onClick={() =>
                {
                    updateImageQuery({
                        variables: {
                            email,
                            file: newImage
                        }
                    });
                }}>
                Update image
            </ThemedButton>
        </DialogActions>
    </Dialog >
}

export default UploadProfileImgDial;