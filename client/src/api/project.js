import { gql } from "@apollo/client";

export const PROJECT_INFO = gql`
    query GetTasksByProject($projectId: String!) {
        getTasksByProject(projectId: $projectId) {
        id
        name
        owner
        tasks {
            id
            name
            description
            assignedTo
            start
            end
            state
            priority
            projectId
            taskType {
                id
                name
            }
        }
    }
}
`;

export const TASK_UPDATE_STATE = gql`
    mutation UpdateTaskState($taskId: String!, $state: String!, $oldState: String!){
        updateTaskState(taskId: $taskId, state: $state, oldState: $oldState){
            id
            toState
            fromState
        }
    }
`;

export const TASK_TYPES = gql`
    query GetActiveTaskTypes {
        getActiveTaskTypes{
            id
            name
    }}
`;

// createTask(name: String!, typeId: String!, assignedToId: String!, start: String!, end: String!, description: String!, projectId: String!): Task

export const CREATE_TASK = gql`
    mutation CreateTask($name: String!, $typeId: String!, $assignedToId: String!, $start: String!, $end: String!, $description: String!, $projectId: String!) {
        createTask(name: $name, typeId: $typeId, assignedToId: $assignedToId, start: $start, end: $end, description: $description, projectId: $projectId){
            id
            name
            description
            taskType{
                name
            }
            assignedTo
            start
            end
            state
            priority
            projectId
        }
    }
`;
