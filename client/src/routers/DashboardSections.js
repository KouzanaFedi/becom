import EventScheduler from "../components/dashboard/projectManager/EventSchedular";
import KanbanBoard from "../components/KanbanBoard";
import calendarIcon from '../assets/icons/calendar.png';
import projectPlanIcon from '../assets/icons/project-plan.png';

export const DASHBOARD_SECTIONS = [{
    name: 'calendar',
    url: '/dashboard/calendar',
    title:'Calendar',
    component: EventScheduler,
    icon: calendarIcon,
},
{
    name: 'board',
    url: '/dashboard/board',
    title: 'Board',
    component: KanbanBoard,
    icon: projectPlanIcon,
}]