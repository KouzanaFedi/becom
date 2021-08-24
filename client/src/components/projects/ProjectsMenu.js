import {
    Box,
    MenuItem,
    MenuList,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { PROJECT_SECTIONS } from "../../routers/ProjectSection";
import { Link } from "react-router-dom";
import { ExpandMore } from '@material-ui/icons';
import { SET_ACTIVE_PROJECT } from "../../redux/logic/projectManager/projectSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 40px)',
        backgroundColor: '#EFE',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    icon: {
        width: '20px',
        margin: '0 20px 0 10px',
        color: theme.palette.text
    },
    link: {
        color: 'unset',
        '&:hover': {
            textDecoration: 'none',
            color: 'unset'
        },
    },
    title: {
        fontWeight: '500',
        textTransform: 'capitalize'

    },
    selectProjectRoot: {
        backgroundColor: '#EFE',
        boxShadow: 'unset',
        paddingTop: '8px',
        marginBottom: '0px !important',
        "& .Mui-expanded": {
            margin: 'unset'
        }
    },
    titleIcon: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
        height: '100%',
        width: '40px',
        borderRadius: '5px',
        textTransform: 'uppercase',
        backgroundColor: '#FFF'
    },
    selectTitle: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        margin: '0',
        fontSize: '16px'
    },
    accordionDetails: {
        padding: '0',
        display: 'list-item'
    },
    summaryExpanded: {
        minHeight: 'unset !important',
    },
    unsetBottomMargin: {
        margin: '0'
    },
    expandedIcon: {
        '&.MuiIconButton-edgeEnd': {
            marginRight: 'unset'
        }
    },
    capitalize: {
        textTransform: 'capitalize'
    }
}));

const ProjectsMenu = ({ activeProject, projectList }) =>
{
    const classes = useStyles();

    return <Box className={classes.root}>
        {activeProject !== null && <SelectProjectMenu activeProject={activeProject} projectList={projectList} />}
        <MenuList >
            {PROJECT_SECTIONS.map((section, key) => <Link
                key={key}
                to={`${section.url}`}
                className={classes.link}>
                <MenuItem>
                    <img className={classes.icon} src={section.icon} alt='icon' /> <Typography className={classes.title}>{section.title}</Typography>
                </MenuItem>
            </Link>)}
        </MenuList>
    </Box>
}

export default ProjectsMenu;

const SelectProjectMenu = ({ projectList, activeProject }) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const abrvName = (activeProject) =>
    {
        const nameSection = activeProject.title.split(' ');
        if (nameSection.length > 1) {
            return `${nameSection[0][0].toUpperCase()}${nameSection[1][0].toUpperCase()}`;
        } else
            return `${nameSection[0][0].toUpperCase()}${nameSection[0][1].toUpperCase()}`
    }

    return <Accordion
        className={classes.selectProjectRoot}
        classes={{ expanded: classes.unsetBottomMargin }}
    >
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={{ content: classes.selectTitle, expanded: classes.summaryExpanded, expandIcon: classes.expandedIcon }}
        >
            <Box p={1} mr={1} className={classes.titleIcon}>
                {abrvName(activeProject)}
            </Box>
            <div className={classes.capitalize}>{activeProject.title}</div>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionDetails }}>
            {projectList.map((proj) => <MenuItem key={proj.id} onClick={() =>
            {
                dispatch(SET_ACTIVE_PROJECT({ id: proj.id }));
            }}>
                <Typography className={classes.title}>{proj.title}</Typography>
            </MenuItem>)}
        </AccordionDetails>
    </Accordion >
}