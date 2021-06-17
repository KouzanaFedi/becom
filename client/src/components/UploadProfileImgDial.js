import { useMutation } from "@apollo/client";
import { Dialog, DialogActions, DialogContent, makeStyles } from "@material-ui/core"
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
        marginBottom: '15px'
    }
}));
const UploadProfileImgDial = ({ open, onClose, name, email }) =>
{
    const classes = useStyles();
    const [newImage, setNewImage] = useState(null);
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

    return <Dialog open={open} onEscapeKeyDown={onClose}>
        <DialogContent className={classes.root}>
            <input
                className={classes.space}
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(event) =>
                {
                    setNewImage(event.target.files[0]);
                }} />
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