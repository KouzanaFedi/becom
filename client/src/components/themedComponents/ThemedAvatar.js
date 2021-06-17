import { Avatar, Badge, IconButton, makeStyles } from "@material-ui/core"
import { AddAPhoto } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '100px',
        width: '100px',
        fontSize: '38px',
        marginBottom: '20px'
    },
    editButton: {
        backgroundColor: '#fff',
        marginBottom: '34px',
        border: `2px solid ${theme.palette.background.default}`,
        '&:focus': {
            outline: 'none'
        },
        '&:hover': {
            backgroundColor: '#ccc'
        }
    }
}));

const ThemedAvatar = ({ type, opneDial, name, image }) =>
{
    const classes = useStyles();
    return <Badge
        overlap="circle"
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        badgeContent={type !== "display" ? (<IconButton
            size="small"
            className={classes.editButton}
            onClick={() =>
            {
                opneDial();
            }}>
            <AddAPhoto fontSize="small" />
        </IconButton>) : ""}
    >
        <Avatar alt="img" src={image} className={classes.avatar} >{name[0].toUpperCase()}</Avatar>
    </Badge>
}

export default ThemedAvatar;