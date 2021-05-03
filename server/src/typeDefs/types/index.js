import { mergeTypeDefs } from "@graphql-tools/merge";
import { accountType } from "./account.type";
import { scheduleType } from "./schedule.type";

const typeTypes = [accountType, scheduleType];

export const types = mergeTypeDefs(typeTypes);