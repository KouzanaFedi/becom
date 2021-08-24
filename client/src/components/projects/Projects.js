import { useLazyQuery, useQuery } from "@apollo/client";
import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProjectById, getProjectListsByClient } from "../../api/project";
import { clientsProject, INIT_CLIENTS_PROJECT, SET_PROJECT_DATA, INIT_PROJECT_TAGS_AND_MEMBERS } from "../../redux/logic/projectManager/projectSlice";
import { userID } from "../../redux/logic/userSlice";
import { PROJECT_SECTIONS } from "../../routers/ProjectSection";
import ProjectsMenu from "./ProjectsMenu";

const Projects = () =>
{
    const history = useHistory();
    const { subsection } = useParams();

    function getSectionComponent(section)
    {
        if (section !== undefined) {
            const res = PROJECT_SECTIONS.find((sec) => sec.name === section);
            if (res === undefined) {
                history.replace('/404');
            }
            return res.component;
        } else return null;
    }

    const ProjectSection = getSectionComponent(subsection);

    const userId = useSelector(userID);
    const { activeProject, projectList } = useSelector(clientsProject);
    const dispatch = useDispatch();

    useQuery(getProjectListsByClient, {
        variables: { client: userId },
        onCompleted: ({ getProjectsByClient, getTags, getMembers }) =>
        {
            if (getProjectsByClient.length > 0) {
                dispatch(INIT_CLIENTS_PROJECT({ active: getProjectsByClient[0], list: getProjectsByClient }))
            }
            dispatch(INIT_PROJECT_TAGS_AND_MEMBERS({ tags: getTags, members: getMembers }));
        }
    });

    const [projectData] = useLazyQuery(getProjectById, {
        onCompleted: ({ getProjectById }) =>
        {
            dispatch(SET_PROJECT_DATA({ services: getProjectById.services, statusOptions: getProjectById.statusOptions, id: getProjectById.client }))
        }
    })

    useEffect(() =>
    {
        if (activeProject !== null) projectData({ variables: { id: activeProject.id } })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject]);



    return <Grid container>
        <CssBaseline />
        <Grid item xs={2}>
            <ProjectsMenu activeProject={activeProject} projectList={projectList} />
        </Grid>
        {ProjectSection ? < ProjectSection /> : <></>}
    </Grid >
}

export default Projects;