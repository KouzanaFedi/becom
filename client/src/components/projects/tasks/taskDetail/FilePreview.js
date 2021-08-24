import { Box, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { StarOutline, Star } from '@material-ui/icons';
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { unifySize } from "../../../../utils/fileHelper";
import { IMAGE_ENDPOINT } from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_ATTACHEMENT_FROM_TASK, SET_TASK_COVER_IMAGE } from "../../../../redux/logic/projectManager/projectSlice";
import { useMutation } from "@apollo/client";
import { deleteAttachementFromTask, setTaskCoverImage } from "../../../../api/project";
import { userData } from "../../../../redux/logic/userSlice";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    preview: ({ isImage }) => ({
        width: '100px',
        height: '100px',
        backgroundColor: isImage ? 'transparent' : '#777',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px'
    }),
    ext: {
        fontWeight: 700,
        fontSize: '24px',
        color: '#EFE'
    },
    image: {
        maxHeight: '100%',
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
        borderRadius: '5px'
    },
    name: {
        fontWeight: 700,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    date: {
        fontSize: '12px',
        textTransform: 'capitalize'
    },
    dl: {
        fontSize: '12px',
        '&:hover': {
            cursor: 'pointer',
            color: 'blue'
        }
    },
    checked: {
        color: '#FDDD3F'
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    optionText: {
        fontSize: '12px',
        marginLeft: '5px',
    },
    delete: {
        fontSize: '12px',
        textAlign: 'end',
        '&:hover': {
            cursor: 'pointer',
            color: 'red'
        }
    }
}));

const FilePreview = ({ link, name, addDate, by, size, serviceId, coverImage, taskId, id }) =>
{
    const [isImage, setIsImage] = useState(false);
    const classes = useStyles({ isImage });
    const [imageCover, setImageCover] = useState(null);
    const ext = link.split('.').pop();
    const dispatch = useDispatch();
    const user = useSelector(userData);
    const fileLink = `${IMAGE_ENDPOINT}${link}`;

    useEffect(() =>
    {
        if (['JPEG', 'JPG', 'PNG', 'GIF'].includes(ext.toUpperCase())) setIsImage(true);
        else setIsImage(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    const [setCoverImage] = useMutation(setTaskCoverImage, {
        onCompleted: () =>
        {
            dispatch(SET_TASK_COVER_IMAGE({ serviceId, taskId, image: imageCover }));
        }
    });

    const [deleteAttachement] = useMutation(deleteAttachementFromTask, {
        onCompleted: () =>
        {
            dispatch(DELETE_ATTACHEMENT_FROM_TASK({ serviceId, taskId, id }));
        }
    });

    return <Box my={1} className={classes.root}>
        <div className={classes.preview}>
            {isImage ? <img className={classes.image} src={fileLink} alt="preview" /> : <Typography className={classes.ext}>{ext.toUpperCase()}</Typography>}
        </div>
        <Box ml={2} className={classes.info}>
            <Typography className={classes.name}>{name}</Typography>
            <Typography className={classes.date}>{addDate}, by {by.name}</Typography>
            <div className={classes.root}>
                <div className={classes.dl} onClick={() => { saveAs(fileLink, name) }}>
                    Download
                </div>
                <div>|</div>
                <Typography className={classes.date}>{unifySize(size)}</Typography>
            </div>
            {isImage && <div>
                {coverImage === link ?
                    <div
                        className={classes.option}
                        onClick={() =>
                        {
                            setImageCover(null);
                            setCoverImage({
                                variables: {
                                    src: null, taskId
                                }
                            });
                        }}>
                        <Star className={classes.checked} />
                        <div className={classes.optionText}>Remove image from cover</div>
                    </div> :
                    <div
                        className={classes.option}
                        onClick={() =>
                        {
                            setImageCover(link);
                            setCoverImage({
                                variables: {
                                    src: link, taskId
                                }
                            });
                        }}>
                        <StarOutline />
                        <div className={classes.optionText}>Set image as cover</div>
                    </div>}
            </div>}
            {user.id === by._id && < div className={classes.delete} onClick={() =>
            {
                deleteAttachement({
                    variables: {
                        attachementId: id, taskId: taskId
                    }
                });
            }}>
                Delete
            </div>}
        </Box>
    </Box >
}

export default FilePreview;