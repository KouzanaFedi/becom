import MenuList from '@material-ui/core/MenuList';
import makeStyles from '@material-ui/styles/makeStyles';
import ThemedSectionIcon from './ThemedSectionIcon';
import exitIcon from '../../assets/icons/exit.png';
import house from '../../assets/icons/house.png';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_TAB, UNSET_ACTIVE_TAB } from '../../redux/ui/menuSlice';
import { DASHBOARD_SECTIONS } from '../../routers/DashboardSections';

const useStyles = makeStyles((theme) => ({
    root: ({ small }) =>
    ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: small ? '376px' : '476px',
        padding: '8px',
    }),
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const ThemedMenu = ({ open, handleListKeyDown, small = false, close }) =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles({ small });
    function setActiveSection(name)
    {
        dispatch(SET_ACTIVE_TAB({ name }));
        if (close) close()
    }

    function unsetActiveSection()
    {
        dispatch(UNSET_ACTIVE_TAB());
        if (close) close()
    }

    function handleLogOut()
    {
        unsetActiveSection();
        localStorage.removeItem(AUTH_TOKEN);
        history.replace("/");
    }

    return (
        <MenuList className={classes.root} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
            {small && <ThemedSectionIcon onClick={unsetActiveSection} link='/' small={small} name="home" icon={house} title="Home" />}
            {DASHBOARD_SECTIONS.map((section, index) => <ThemedSectionIcon
                key={index} onClick={setActiveSection} link={section.url} small={small} name={section.name} icon={section.icon} title={section.title} />)}
            <ThemedSectionIcon link='#' small={small} name="logout" icon={exitIcon} title="Logout" onClick={handleLogOut} />
        </MenuList>
    );
};

export default ThemedMenu;