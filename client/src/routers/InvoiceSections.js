import archive from '../assets/icons/archive.png'
import template from '../assets/icons/template.png'
import request from '../assets/icons/request.png'
import InvoiceArchive from "../components/invoice/InvoiceArchive";
import InvoiceRequests from "../components/invoice/InvoiceRequests";
import InvoiceTemplates from "../components/invoice/InvoiceTemplates";

export const INVOICE_SECTIONS = [{
    name: 'request',
    url: '/dashboard/invoices/request',
    title: 'Requests',
    component: InvoiceRequests,
    icon: request,
},
{
    name: 'template',
    url: '/dashboard/invoices/template',
    title: 'Template',
    component: InvoiceTemplates,
    icon: template,
},
{
    name: 'archive',
    url: '/dashboard/invoices/archive',
    title: 'Archive',
    component: InvoiceArchive,
    icon: archive,
}]