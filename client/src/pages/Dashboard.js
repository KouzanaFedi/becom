import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationDrawer from '../components/dashboard/NavigationDrawer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import EventScheduler from '../components/dashboard/projectManager/ProjectManager';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden'
    }
}));

export default function Dashboard()
{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <BrowserRouter basename='dashbord'>
                <NavigationDrawer />
                <main className={classes.content}>
                    <Switch>
                        <Route exact path={'/projectManager'} component={EventScheduler} />
                        <Route exact path={'/board'} component={KanbanBoard} />
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}