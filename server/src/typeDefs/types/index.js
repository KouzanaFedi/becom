import { mergeTypeDefs } from "@graphql-tools/merge";
import { accountType } from "./account.type";
import { projectType } from "./project.type";
import { scheduleType } from "./schedule.type";

const typeTypes = [accountType, scheduleType, projectType];

export const types = mergeTypeDefs(typeTypes);