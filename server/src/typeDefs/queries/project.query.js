import { gql } from 'apollo-server-express';

export const project = gql`
    type Query {
    getProjectsByClient(client: String!): [Project!]!
    getProjectById(id: String!): ProjectData
    getTags: [Tag!]!
    getStatusOptions: [Status!]!
    getMembers: [Member!]!
  }

    type Mutation {
    createProject(title: String!, client: String!): BasicResponse
    deleteProject(id: String!): BasicResponse
    addStatusesToProject(projectId: String!, status: [String!]): BasicResponse
    createServiceForProject(title: String!, description: String!,  projectId: String!): BasicResponse
    deleteServiceFromProject(serviceId: String!, projectId: String!): BasicResponse
    updateServiceDescription(id: String!, description: String!): BasicResponse
    setServiceDueTime(id: String!, time: String): BasicResponse
    createTaskForService(title: String!, status: String!, serviceId: String!): IdResponse
    deleteTaskFromService(serviceId: String!, taskId: String!): BasicResponse
    addTagToTask(id: String!, tag: String!): BasicResponse
    deleteTagFromTask(id: String!, tag: String!): BasicResponse
    updateTaskStatus(taskId: String!, statusId: String!): BasicResponse
    updateTaskDescription(id : String!, description: String!): BasicResponse
    assignMemberToTask(id: String!, member: String!): BasicResponse
    unassignMemberFromTask(id: String!, member: String!): BasicResponse
    setTaskCoverImage(src: String, taskId: String!): BasicResponse
    setTaskStatus(status: String, taskId: String!): BasicResponse
    setTaskDueTime(id: String!, time: String): BasicResponse
    sendAttachementToTask(file: Upload!, addedBy: String!, projectTitle: String!, taskId: String!): Attachement
    deleteAttachement(attachementId: String!,taskId: String!): BasicResponse
    sendNotesToProject(sender: String!, message: String!, id: String!, toTask: Boolean!): BasicResponse
    createStatus(title: String!, color: String!, type: String!): BasicResponse
    deleteStatus(id: String!): BasicResponse
    createTag(title: String!, color: String!): Tag
    deleteTag(id: String!): BasicResponse
  }
`;