import { Project } from "../schema/project/project";
import { TaskType } from "../schema/project/taskType";
import { Task } from "../schema/project/task";
import { EVENT_INVALIDE_ERROR } from "../utils/errors/EventError";
import { AuthenticationError } from "apollo-server-errors";
import { Types } from "mongoose";

export const projectResolver = {
    Query: {
        getProjectsByOwner: async (_, args) =>
        {
            const { owner } = args;
            const projects = [];
            await Project.find({ owner }, (_, project) =>
            {
                if (project != undefined) {
                    project.forEach(element =>
                    {
                        const { _id, name, owner } = element;
                        projects.push({ id: _id, name, owner });
                    });
                }
            });
            return projects;
        },
        getTaskTypes: async (_, __) =>
        {

            const taskTypes = [];
            await TaskType.find({}, (_, tt) =>
            {
                if (tt != undefined) {
                    tt.forEach(element =>
                    {
                        const { _id, name, active } = element;
                        taskTypes.push({ id: _id, name, active });
                    });
                }
            });
            return taskTypes;
        },
        getActiveTaskTypes: async (_, __) =>
        {
            const taskTypes = [];
            await TaskType.find({ active: true }, (_, tt) =>
            {
                if (tt != undefined) {
                    tt.forEach(element =>
                    {
                        const { _id, name } = element;
                        taskTypes.push({ id: _id, name });
                    });
                }
            });
            return taskTypes;
        },
        getTasksByProject: async (_, args) =>
        {
            const { projectId } = args;
            const arrayOfData = await Project.aggregate([
                {
                    $match: {
                        "_id": Types.ObjectId(projectId)
                    }
                },
                {
                    $lookup: {
                        from: 'tasks',
                        localField: '_id',
                        foreignField: 'projectId',
                        as: 'task'
                    }
                },
                {
                    $unwind: '$task'
                },
                {
                    $lookup: {
                        from: 'tasktypes',
                        localField: 'task.typeId',
                        foreignField: '_id',
                        as: 'task.typeId'
                    }
                },
                {
                    $unwind: '$task.typeId'
                },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        owner: { $first: '$owner' },
                        tasks: {
                            $push: '$task'
                        }
                    }
                },
                {
                    $unwind: '$_id'
                }
            ]);
            const data = arrayOfData[0];

            const res = {
                id: data._id,
                name: data.name,
                owner: data.owner,
                tasks: []
            };

            data.tasks.map((element) =>
            {
                res.tasks.push({
                    id: element._id,
                    name: element.name,
                    description: element.description,
                    taskType: {
                        id: element.typeId._id,
                        name: element.typeId.name
                    },
                    assignedTo: element.assignedToId,
                    start: element.start,
                    end: element.end,
                    state: element.state,
                    priority: element.priority,
                    projectId: element.projectId
                });
            });
            console.log(res);
            return res;
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
        },
        updateTaskType: async (_, args) =>
        {
            const { id, name } = args;
            const taskType = await TaskType.findByIdAndUpdate(id, { $set: { name } }, { new: true });

            if (taskType == null) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());
            }

            return {
                succes: true
            }
        },
        updateActiveTaskTypeState: async (_, args) =>
        {
            const { id, active } = args;
            await TaskType.findByIdAndUpdate(id, { $set: { active } });

            return {
                succes: true
            }
        },
        createTask: async (_, args) =>
        {
            const { name, typeId, assignedToId, start, end, description, projectId } = args;
            const task = new Task({ name, typeId, assignedToId, start, end, description, projectId });
            const taskType = await TaskType.findById(typeId);
            task.save();

            return {
                id: task._id,
                name: task.name,
                description: task.description,
                taskType: {
                    id: taskType._id,
                    name: taskType.name
                },
                assignedTo: task.assignedToId,
                start: task.start,
                end: task.end,
                state: task.state,
                priority: task.priority,
                projectId: task.projectId
            }
        },
        updateTaskPrio: async (_, args) =>
        {
            const { taskId, priority } = args;
            const task = await Task.findByIdAndUpdate(taskId, { $set: { priority } }, { new: true });
            if (task == null) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());
            }

            return {
                succes: true
            }
        },
        deleteTask: async (_, args) =>
        {
            const { taskId } = args;
            await Task.findByIdAndDelete(taskId);
            return {
                id: taskId
            }
        },
        updateTaskInfo: async (_, args) =>
        {
            const { taskId, name, description, taskTypeId, assignedToId, start, end } = args;
            const modif = {};
            if (name != null) {
                modif['name'] = name;
            }
            if (description != null) {
                modif['description'] = description;
            }
            if (assignedToId != null) {
                modif['assignedToId'] = assignedToId;
            }
            if (start != null) {
                modif['start'] = start;
            }
            if (end != null) {
                modif['end'] = end;
            }
            if (taskTypeId != null) {
                modif['typeId'] = taskTypeId;
            }

            const task = await Task.findByIdAndUpdate(taskId, { $set: modif }, { new: true });

            if (task == null) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());
            }

            const taskType = await TaskType.findById(task.typeId);

            return {
                id: task._id,
                name: task.name,
                description: task.description,
                taskType: {
                    id: taskType._id,
                    name: taskType.name
                },
                assignedTo: task.assignedToId,
                start: task.start,
                end: task.end,
                state: task.state,
                priority: task.priority,
                projectId: task.projectId
            }
        },
        updateTaskState: async (_, args) =>
        {
            const { taskId, state,oldState } = args;
            const validStates = ['todo', 'doing', 'done', 'toreview'];

            if (!validStates.includes(state)) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());
            }

            const task = await Task.findByIdAndUpdate(taskId, { $set: { state } }, { new: true });

            return {
                id: task._id,
                fromState: oldState,
                toState: task.state
            }
        }
    }
}