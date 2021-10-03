import EventScheduler from "../components/dashboard/projectManager/EventSchedular";
// import KanbanBoard from "../components/KanbanBoard";
import calendarIcon from '../assets/icons/calendar.png';
// import projectPlanIcon from '../assets/icons/project-plan.png';
import invoiceIcon from '../assets/icons/invoice.png';
import projectsIcon from '../assets/icons/projects.png';
import Invoice from "../components/invoice/Invoice";
import Projects from "../components/projects/Projects";
import ImageAnnotation from "../components/annotation/ImageAnnotation";

export const DASHBOARD_SECTIONS = [{
    name: 'projects',
    url: '/dashboard/projects',
    title: 'Projects',
    component: Projects,
    icon: projectsIcon,
},
{
    name: 'calendar',
    url: '/dashboard/calendar',
    title: 'Calendar',
    component: EventScheduler,
    icon: calendarIcon,
},
{
    name: 'annotation',
    url: '/dashboard/annotation',
    title: 'Annotation',
    component: ImageAnnotation,
    icon: calendarIcon,
},
// {
//     name: 'board',
//     url: '/dashboard/board',
//     title: 'Board',
//     component: KanbanBoard,
//     icon: projectPlanIcon,
// },
{
    name: 'invoices',
    url: '/dashboard/invoices',
    title: 'Invoices',
    component: Invoice,
    icon: invoiceIcon,
}]