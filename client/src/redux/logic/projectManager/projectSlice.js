import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        clientsProjects: {
            activeProject: null,
            projectList: []
        },
        tags: [],
        members: [],
        services: [],
        statusOptions: [],
        selectedTask: null,
        client: null
    },
    reducers: {
        INIT_CLIENTS_PROJECT: (state, action) =>
        {
            const { active, list } = action.payload;
            state.clientsProjects.activeProject = {
                title: active.title,
                id: active.id,
                createdAt: active.createdAt
            }
            state.clientsProjects.projectList = list;
        },
        INIT_PROJECT_TAGS_AND_MEMBERS: (state, action) =>
        {
            const { tags, members } = action.payload;
            state.tags = tags;
            state.members = members;
        },
        SET_ACTIVE_PROJECT: (state, action) =>
        {
            const { id } = action.payload;
            const item = state.clientsProjects.projectList.find((proj) => proj.id === id);
            state.clientsProjects.activeProject = {
                title: item.title,
                id: item.id,
                createdAt: item.createdAt
            }
        },
        SET_PROJECT_DATA: (state, action) =>
        {
            const { services, statusOptions, id } = action.payload;
            state.services = services;
            state.statusOptions = statusOptions;
            state.clientId = id;
        },
        SET_SELECTED_TASK: (state, action) =>
        {
            const { serviceId, taskId } = action.payload;
            state.selectedTask = { serviceId, taskId };
        },
        ADD_NOTE_TO_PROJECT: (state, action) =>
        {
            const { serviceId, taskId, message, sender } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const timestamp = new Date().getTime();
            state.services[serviceIndex].tasks[taskIndex].notes.push({
                _id: timestamp,
                createdAt: timestamp,
                message,
                sender
            });
        },
        SET_TASK_COVER_IMAGE: (state, action) =>
        {
            const { image, serviceId, taskId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            state.services[serviceIndex].tasks[taskIndex].coverImage = image;
        },
        DELETE_ATTACHEMENT_FROM_TASK: (state, action) =>
        {
            const { id, serviceId, taskId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const attachIndex = state.services[serviceIndex].tasks[taskIndex].attachement.findIndex((attach) => attach._id === id);
            state.services[serviceIndex].tasks[taskIndex].attachement.splice(attachIndex, 1);
        },
        ADD_ATTACHEMENT_TO_TASK: (state, action) =>
        {
            const { addedBy, createdAt, size, src, _id, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            state.services[serviceIndex].tasks[taskIndex].attachement.push({ addedBy, createdAt, size, src, _id });
        },
        ADD_TAG_TO_TASK: (state, action) =>
        {
            const { tag, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const taskObj = state.tags.find((t) => t._id === tag);
            state.services[serviceIndex].tasks[taskIndex].tags.push(taskObj);
        },
        DELETE_TAG_FROM_TASK: (state, action) =>
        {
            const { tag, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const tagIndex = state.services[serviceIndex].tasks[taskIndex].tags.findIndex((t) => t._id === tag);
            state.services[serviceIndex].tasks[taskIndex].tags.splice(tagIndex, 1);
        },
        ASSIGN_MEMBER_TO_TASK: (state, action) =>
        {
            const { member, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const memberObj = state.members.find((m) => m._id === member);
            state.services[serviceIndex].tasks[taskIndex].members.push(memberObj);
        },
        UNASSIGN_MEMBER_FROM_TASK: (state, action) =>
        {
            const { member, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            const memberIndex = state.services[serviceIndex].tasks[taskIndex].members.findIndex((m) => m._id === member);
            state.services[serviceIndex].tasks[taskIndex].members.splice(memberIndex, 1);
        },
        SET_TASK_DUE_TIME: (state, action) =>
        {
            const { time, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            state.services[serviceIndex].tasks[taskIndex].dueTime = time;
        },
        UPDATE_TASK_DESCRIPTION: (state, action) =>
        {
            const { description, taskId, serviceId } = action.payload;
            const serviceIndex = state.services.findIndex((service) => service._id === serviceId);
            const taskIndex = state.services[serviceIndex].tasks.findIndex((task) => task._id === taskId);
            state.services[serviceIndex].tasks[taskIndex].description = description;
        }
    }
});

export const { INIT_CLIENTS_PROJECT, SET_ACTIVE_PROJECT, SET_PROJECT_DATA, SET_SELECTED_TASK, ADD_NOTE_TO_PROJECT, SET_TASK_COVER_IMAGE, DELETE_ATTACHEMENT_FROM_TASK, ADD_ATTACHEMENT_TO_TASK, INIT_PROJECT_TAGS_AND_MEMBERS, ADD_TAG_TO_TASK, DELETE_TAG_FROM_TASK, ASSIGN_MEMBER_TO_TASK, UNASSIGN_MEMBER_FROM_TASK, SET_TASK_DUE_TIME, UPDATE_TASK_DESCRIPTION } = projectSlice.actions;

export const clientsProject = (state) => state.project.clientsProjects;
export const availableProjectTags = (state) => state.project.tags;
export const availableProjectMembers = (state) => state.project.members;
export const clientsActiveProject = (state) => state.project.clientsProjects.activeProject;
export const clientActiveProjectService = (state) => state.project.services;
export const projectStatusOptions = (state) => state.project.statusOptions;
export const projectSelectedTask = (state) => state.project.selectedTask;

export default projectSlice.reducer;