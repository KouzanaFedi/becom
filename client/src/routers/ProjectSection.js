import files from '../assets/icons/files.png'
import tasks from '../assets/icons/tasks.png'
import board from '../assets/icons/board.png'
import collaborators from '../assets/icons/collaborators.png'

import ProjectTasks from '../components/projects/ProjectTasks'
import ProjectBoard from '../components/projects/ProjectBoard'
import ProjectFiles from '../components/projects/ProjectFiles'
import ProjectCollaborators from '../components/projects/ProjectCollaborators'


export const PROJECT_SECTIONS = [{
    name: 'tasks',
    url: '/dashboard/projects/tasks',
    title: 'Tasks',
    component: ProjectTasks,
    icon: tasks,
},
{
    name: 'board',
    url: '/dashboard/projects/board',
    title: 'Board',
    component: ProjectBoard,
    icon: board,
},
{
    name: 'files',
    url: '/dashboard/projects/files',
    title: 'Files',
    component: ProjectFiles,
    icon: files,
},
// {
//     name: 'collaborators',
//     url: '/dashboard/projects/collaborators',
//     title: 'Collaborators',
//     component: ProjectCollaborators,
//     icon: collaborators,
// }
];