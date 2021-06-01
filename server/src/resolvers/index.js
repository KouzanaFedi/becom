import { scheduleResolver } from './schedule.resolver';
import { accountResolver } from './account.resolver';
import { projectResolver } from './project.resolver';

export const resolvers = [accountResolver, scheduleResolver, projectResolver];
