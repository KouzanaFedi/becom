import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ThemedSectionIcon from './ThemedSectionIcon';

import exitIcon from '../../assets/icons/exit.png';
import house from '../../assets/icons/house.png';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_TAB, UNSET_ACTIVE_TAB } from '../../redux/ui/menuSlice';
import { DASHBOARD_SECTIONS } from '../../routers/DashboardSections';

const useStyles = makeStyles((theme) => ({
    root: (small) => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: `${small ? '400px' : '460px'}`,
        padding: '8px',
    }),
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const ThemedMenu = ({ open, handleListKeyDown, small = false }) =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles({ small });

    function setActiveSection(name)
    {
        dispatch(SET_ACTIVE_TAB({ name }));
    }

    function unsetActiveSection()
    {
        dispatch(UNSET_ACTIVE_TAB());
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