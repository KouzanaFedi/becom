import { mergeTypeDefs } from "@graphql-tools/merge";
import { account } from "./account.query";
import { invoice } from "./invoice.query";
import { project } from "./project.query";
import { schedule } from "./schedule.query";

const queryTypes = [account, schedule, project, invoice];

export const queries = mergeTypeDefs(queryTypes);