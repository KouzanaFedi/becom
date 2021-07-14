import { scheduleResolver } from './schedule.resolver';
import { accountResolver } from './account.resolver';
import { projectResolver } from './project.resolver';
import { invoiceResolver } from './invoice.resolver';

export const resolvers = [accountResolver, scheduleResolver, projectResolver, invoiceResolver];
