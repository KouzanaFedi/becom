import { MenuItem, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menuActiveTab } from "../../redux/ui/menuSlice";

const useStyles = makeStyles((_) => ({
    root: ({ active, small }) => ({
        display: 'flex',
        flexDirection: 'column',
        width: small ? '72px' : '92px',
        backgroundColor: active ? 'rgba(0, 0, 0, .04)' : 'inherit'
    }),
    icon: ({ small }) =>
    ({
        width: small ? '40px' : '60px'
    }),
    title: ({ small }) =>
    ({
        fontSize: small ? '12px' : '14px',
        color: '#626262',
        marginTop: '5px',
        whiteSpace: 'normal',
        textAlign: 'center'
    }),
    link: {
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

const ThemedSectionIcon = ({ icon, title, onClick, small, name, link }) =>
{
    const activeTab = useSelector(menuActiveTab);
    const active = activeTab === name;

    const classes = useStyles({ small, active });
    return <Link to={`${link}`} className={classes.link} onClick={() =>
    {
        if (onClick.name === 'setActiveSection') {
            onClick(name);
        } else onClick();
    }}>
        <MenuItem
            className={classes.root}>
            <img alt='icon' src={icon} className={classes.icon} />
            <Typography className={classes.title}>
                {title}
            </Typography>
        </MenuItem>
    </Link>
}

export default ThemedSectionIcon;