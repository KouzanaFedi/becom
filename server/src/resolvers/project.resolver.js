import { Project } from "../schema/project/project";
import { Task } from "../schema/project/task";
import { User } from "../schema/user/user";
import { INVALIDE_INPUT_ERROR } from "../utils/errors/EventError";
import { AuthenticationError } from "apollo-server-errors";
import { Tag } from "../schema/project/tag";
import { Service } from "../schema/project/service";
import { Status } from "../schema/project/status";
import { Attachement } from "../schema/project/attachement";
import { getFileUploadedSize, processUpload } from '../utils/fileUpload';
import { unlinkSync } from 'fs';
import { resolve } from "path";
import { ProjectNote } from "../schema/project/projectNote";
import { prettifyDate } from "../utils/util";

export const projectResolver = {
    Query: {
        getProjectsByClient: async (_, args) =>
        {
            const { client } = args;
            const projects = [];
            await Project.find({ client }, (_, project) =>
            {
                if (project != undefined) {
                    project.forEach(element =>
                    {
                        const { _id, title, createdAt } = element;
                        projects.push({ id: _id, title, createdAt: prettifyDate(createdAt) });
                    });
                }
            });

            if (projects.length > 0) {
                projects.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt));
            }
            return projects;
        },
        getProjectById: async (_, args) =>
        {
            const { id } = args;
            const project = await Project.findById(id)
                .populate('statusOptions', 'type _id title color')
                .populate({
                    path: 'services',
                    select: { 'updatedAt': 0, '__v': 0 },
                    populate: [{
                        path: 'notes',
                        model: 'projectNote',
                        select: { 'updatedAt': 0, '__v': 0 },
                        populate: {
                            path: 'sender',
                            model: 'users',
                            select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                        }
                    },
                    {
                        path: 'tasks',
                        model: 'task',
                        select: { 'updatedAt': 0, '__v': 0 },
                        populate: [{
                            path: 'tags',
                            model: 'tag',
                            select: { '__v': 0 },
                        },
                        {
                            path: 'members',
                            model: 'users',
                            select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                        },
                        {
                            path: 'attachement',
                            model: 'attachement',
                            select: { 'updatedAt': 0, '__v': 0 },
                            populate: {
                                path: 'addedBy',
                                model: 'users',
                                select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                            },
                        },
                        {
                            path: 'notes',
                            model: 'projectNote',
                            select: { 'updatedAt': 0, '__v': 0 },
                            populate: {
                                path: 'sender',
                                model: 'users',
                                select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                            }
                        },
                        {
                            path: 'status',
                            model: 'status',
                            select: { 'updatedAt': 0, '__v': 0, 'createdAt': 0 },
                        }]
                    }]
                });

            const { _id, title, client, createdAt, statusOptions, services } = project;
            return {
                _id,
                title,
                client,
                createdAt,
                statusOptions,
                services
            }
        },
        //tag
        getTags: async (_, args) =>
        {
            const res = [];
            await Tag.find({}, (_, tags) =>
            {
                if (tags != undefined) {
                    tags.forEach(element =>
                    {
                        const { _id, title, color } = element;
                        res.push({ _id, title, color });
                    });
                }
            });
            return res;
        },
        getStatusOptions: async (_, args) =>
        {
            const res = [];
            await Status.find({}, (_, stats) =>
            {
                if (stats != undefined) {
                    stats.forEach(element =>
                    {
                        const { _id, title, color, type } = element;
                        res.push({ _id, title, color, type });
                    });
                }
            });
            return res;
        },
        getMembers: async (_, args) =>
        {
            const res = [];
            await User.find({}, (_, members) =>
            {
                if (members != undefined) {
                    members.forEach(element =>
                    {
                        const { _id, name, email, image } = element;
                        res.push({ _id, name, email, image });
                    });
                }
            });
            return res;
        },
    },
    Mutation: {
        //project
        createProject: async (_, args) =>
        {
            const { title, client } = args;
            const project = new Project({ title, client });
            project.save();
            const populated = await project.populate('client').execPopulate();
            // console.log(populated);
            return {
                succes: true
            }
        },
        deleteProject: async (_, args) =>
        {
            await Project.findByIdAndDelete(args.id);
            return {
                succes: true
            }
        },
        addStatusesToProject: async (_, args) =>
        {
            const { projectId, status } = args
            const project = await Project.findById(projectId);
            project.statusOptions = status;
            project.save();
            return {
                succes: true
            }
        },
        //services
        createServiceForProject: async (_, args) =>
        {
            const { title, description, projectId } = args;
            const service = new Service({ title, description });
            service.save();
            const project = await Project.findById(projectId);
            project.services.push(service._id);
            project.save();

            return {
                succes: true
            }

        },
        deleteServiceFromProject: async (_, args) =>
        {
            const { serviceId, projectId } = args;
            const project = await Project.findById(projectId);
            const serviceIndexInArray = project.services.findIndex((ser) => ser == serviceId);
            project.services.splice(serviceIndexInArray, 1);
            project.save();
            await Service.findByIdAndDelete(serviceId);

            return {
                succes: true
            }
        },
        updateServiceDescription: async (_, args) =>
        {
            const { id, description } = args;
            const service = await Service.findById(id);
            service.description = description;
            service.save();

            return {
                succes: true
            }
        },
        setServiceDueTime: async (_, args) =>
        {
            const { id, time } = args;

            const service = await Service.findById(id);
            service.dueTime = time;
            service.save();

            return {
                succes: true
            }
        },
        //task
        createTaskForService: async (_, args) =>
        {
            const { title, status, serviceId } = args;
            const task = new Task({ title, status })
            task.save();

            const service = await Service.findById(serviceId);
            service.tasks.push(task._id);
            service.save();

            return {
                id: task._id
            }
        },
        deleteTaskFromService: async (_, args) =>
        {
            const { serviceId, taskId } = args;
            const service = await Service.findById(serviceId);
            const taskIndexInArray = service.tasks.findIndex((task) => task === taskId);
            service.tasks.splice(taskIndexInArray, 1);
            service.save();
            await Task.findByIdAndDelete(taskId);

            return {
                succes: true
            }
        },
        updateTaskStatus: async (_, args) =>
        {
            const { taskId, statusId } = args;
            const task = await Task.findById(taskId);
            task.status = statusId;
            task.save();

            return {
                succes: true
            }
        },
        updateTaskDescription: async (_, args) =>
        {
            const { id, description } = args;
            const task = await Task.findById(id);
            task.description = description;
            task.save();

            return {
                succes: true
            }
        },
        addTagToTask: async (_, args) =>
        {
            const { id, tag } = args;
            const task = await Task.findById(id);
            task.tags.push(tag);
            task.save();

            return {
                succes: true
            }
        },
        deleteTagFromTask: async (_, args) =>
        {
            const { id, tag } = args;
            const task = await Task.findById(id);
            const tagIndex = task.tags.findIndex((taskTag) => taskTag == tag);
            task.tags.splice(tagIndex, 1);
            task.save();

            return {
                succes: true
            }
        },
        assignMemberToTask: async (_, args) =>
        {
            const { id, member } = args;
            const task = await Task.findById(id);
            task.members.push(member);
            task.save();

            return {
                succes: true
            }
        },
        unassignMemberFromTask: async (_, args) =>
        {
            const { id, member } = args;
            const task = await Task.findById(id);
            const memberIndex = task.members.findIndex((mem) => mem == member);
            task.members.splice(memberIndex, 1);
            task.save();

            return {
                succes: true
            }
        },
        setTaskCoverImage: async (_, args) =>
        {
            const { src, taskId } = args
            const task = await Task.findById(taskId);
            task.coverImage = src;
            task.save();

            return {
                succes: true
            }
        },
        setTaskStatus: async (_, args) =>
        {
            const { statusId, taskId } = args
            const task = await Task.findById(taskId);
            task.status = statusId;
            task.save();

            return {
                succes: true
            }
        },
        setTaskDueTime: async (_, args) =>
        {
            const { id, time } = args;

            const task = await Task.findById(id);
            task.dueTime = time;
            task.save();

            return {
                succes: true
            }
        },
        //attachement
        sendAttachementToTask: async (_, args) =>
        {
            const { addedBy, taskId, projectTitle } = args;
            const file = await args.file;

            const task = await Task.findById(taskId);

            const fileLoaded = await processUpload(file, `/${projectTitle}/${task.title}`);

            const fileSize = getFileUploadedSize(fileLoaded.src);

            const attachement = new Attachement({ src: fileLoaded.src, addedBy, size: fileSize });
            attachement.save();

            task.attachement.push(attachement._id);
            task.save()

            return {
                _id: attachement._id,
                src: fileLoaded.src,
                addedBy: null,
                createdAt: new Date().getTime(),
                size: fileSize
            }
        },
        deleteAttachement: async (_, args) =>
        {
            const { attachementId, taskId } = args;
            const attachement = await Attachement.findById(attachementId);
            const task = await Task.findById(taskId);

            if (task.coverImage === attachement.src) {
                task.coverImage = null;
            }

            const BASE_DIR = resolve(__dirname, '..', '..', 'public');
            unlinkSync(BASE_DIR + attachement.src);

            const attachementIndex = task.attachement.findIndex((atta) => atta == attachementId);
            console.log(attachementIndex);
            task.attachement.splice(attachementIndex, 1);
            task.save();

            await Attachement.findByIdAndDelete(attachementId);

            return {
                succes: true
            }
        },
        //notes
        sendNotesToProject: async (_, args) =>
        {
            const { sender, message, id, toTask } = args;
            const note = new ProjectNote({ sender, message });
            note.save();

            if (toTask) {
                const task = await Task.findById(id);
                task.notes.push(note._id);
                task.save();
            } else {
                const service = await Service.findById(id);
                service.notes.push(note._id);
                service.save();
            }

            return {
                succes: true
            }
        },
        //status
        createStatus: async (_, args) =>
        {
            const { title, color, type } = args;

            const availableTypes = ['todo', 'doing', 'done', 'abondoned'];
            if (!availableTypes.includes(type.toLowerCase())) {
                throw new AuthenticationError(INVALIDE_INPUT_ERROR.toString());
            }

            const status = new Status({ title, color, type });
            status.save();
            return {
                succes: true
            }
        },
        deleteStatus: async (_, args) =>
        {
            await Status.findByIdAndDelete(args.id);
            return {
                succes: true
            }
        },
        //tags
        createTag: async (_, args) =>
        {
            const { title, color } = args;
            const tag = new Tag({ title, color });
            tag.save();
            return {
                _id: tag._id,
                title,
                color
            }
        },
        deleteTag: async (_, args) =>
        {
            await Tag.findByIdAndDelete(args.id);
            return {
                succes: true
            }
        },

    }
}