import makeStyles from '@material-ui/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemedAppBar from '../components/themedComponents/ThemedAppBar';
import { useHistory, useParams } from 'react-router-dom';
import { DASHBOARD_SECTIONS } from '../routers/DashboardSections';
import { useDispatch, useSelector } from 'react-redux';
import { menuActiveTab, SET_ACTIVE_TAB } from '../redux/ui/menuSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden'
    }
}));

export default function Dashboard()
{
    const classes = useStyles();
    const history = useHistory();
    const { section } = useParams();
    const dispatch = useDispatch();

    const sectionName = useSelector(menuActiveTab);

    function getSectionComponent(section)
    {
        const res = DASHBOARD_SECTIONS.find((sec) => sec.name === section);
        if (res === undefined) {
            history.replace('/404');
        } else {
            dispatch(SET_ACTIVE_TAB({ name: res.name }));
        }
        return res.component;
    }

    const SectionComponent = getSectionComponent(section);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ThemedAppBar type='menu' name={sectionName} />
            <SectionComponent />
        </div >
    );
}