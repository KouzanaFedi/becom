import { gql } from 'apollo-server-express';

export const project = gql`
    type Query {
    getTaskTypes: [TaskType!]!
    getActiveTaskTypes: [TaskType!]!
    getProjectsByOwner(owner: String!): [Project!]!
    getTasksByProject(projectId: String!): ProjectData
  }

    type Mutation {
    createProject(name: String!, owner: String!): BasicResponse
    createTaskType(name: String!): BasicResponse
    updateTaskType(id: String!, name: String!): BasicResponse
    updateActiveTaskTypeState(id: String!, active: Boolean!): BasicResponse
    createTask(name: String!, typeId: String!, assignedToId: String!, start: String!, end: String!, description: String!, projectId: String!): Task
    updateTaskPrio(taskId: String!, priority: Int!): BasicResponse
    deleteTask(taskId: String!): IdResponse
    updateTaskInfo(taskId: String!, name: String, description: String, taskTypeId: String, assignedToId: String, start: String, end: String): Task
    updateTaskState(taskId: String!, state: String!, oldState: String!): TaskState
  }
`;
