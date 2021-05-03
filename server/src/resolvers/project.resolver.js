import { TaskType } from "../schema/project/taskType";

export const projectResolver = {
    Query: {
        getTaskTypes: async (_, __) =>
        {

            const taskTypes = [];
            await TaskType.find({}, (types) =>
            {
                types.forEach(element =>
                {
                    const { id, name } = element;
                    taskTypes.push({ id, name });
                });
            });
            return taskTypes;
        }
    },
    Mutation: {
        createProject: async (_, args) =>
        {
            const { name, owner } = args;
            const project = new Project({ name, owner });
            project.save();
            return {
                succes: true
            }
        },
        createTaskType: async (_, args) =>
        {
            const { name } = args;
            const taskType = new TaskType({ name });
            taskType.save();
            return {
                succes: true
            }
        }
    }
}