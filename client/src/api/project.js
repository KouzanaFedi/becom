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

/// new queries

export const getProjectListsByClient = gql`
    query GetProjectsByClient($client: String!) {
        getProjectsByClient(client: $client) {
            id
            title
            createdAt
        }
        getTags {
            _id
            title
            color
        }
        getMembers {
            name
            _id
            image
            email
        }
    }
`;

export const getProjectById = gql`
    query GetProjectById($id: String!) {
        getProjectById(id: $id){
            _id
            title
            client
            createdAt
            statusOptions {
                _id
                type
                title
                color
                }
            services {
                _id
                title
                description
                dueTime
                createdAt
                tasks {
                    _id
                    title
                    description
                    dueTime
                    createdAt
                    coverImage
                    notes {
                        _id
                        message
                        createdAt
                        sender {
                            _id
                            image
                            name
                            email
                        }
                    }
                    attachement {
                        _id
                        src
                        createdAt
                        size
                        addedBy {
                            image
                            _id
                            name
                            email
                        }
                    }
                    members {
                        _id
                        image
                        name
                        email
                        }
                    tags {
                        _id
                        title
                        color
                        }
                    status {
                        _id
                        type
                        title
                        color
                        }
                    }
            notes {
                _id
                message
                createdAt
                sender {
                    _id
                    image
                    name
                    email
                    }
                }
            }
        }
    }
`;


export const sendNoteToProject = gql`
    mutation sendNotesToProject($sender: String!, $message: String!, $id: String!, $toTask: Boolean!) {
        sendNotesToProject(sender: $sender, message: $message, id: $id, toTask: $toTask) {
            succes
        }
    }
`;

export const setTaskCoverImage = gql`
    mutation setTaskCoverImage($src: String, $taskId: String!) {
        setTaskCoverImage(src: $src, taskId: $taskId){
            succes
        }
    }
`;

export const deleteAttachementFromTask = gql`
    mutation deleteAttachement($attachementId: String!, $taskId: String!) {
        deleteAttachement(
            attachementId: $attachementId, taskId: $taskId) {
            succes
        }
    }
`;

export const AddAttachementToTask = gql`
    mutation sendAttachementToTask($file: Upload!, $addedBy: String!, $taskId: String!, $projectTitle: String! ) {
        sendAttachementToTask(addedBy: $addedBy, taskId: $taskId, projectTitle: $projectTitle, file: $file) {
            _id
            src
            createdAt
            size
            addedBy {
                _id
            }
        }
    }
`;

export const getTags = gql`
    query {
        getTags {
            _id
            title
            color
        }
    }
`;

export const deleteTagFromTask = gql`
    mutation ($id: String!, $tag: String!) {
        deleteTagFromTask(id: $id, tag: $tag){
            succes
        }
    }
`;

export const addTagToTask = gql`
    mutation ($id: String!, $tag: String!) {
        addTagToTask(id: $id, tag: $tag){
            succes
        }
    }
`;

export const assignMemberFromTask = gql`
    mutation ($id: String!, $member: String!) {
        assignMemberToTask(id: $id, member: $member){
            succes
        }
    }
`;

export const unassignMemberToTask = gql`
    mutation ($id: String!, $member: String!) {
        unassignMemberFromTask(id: $id, member: $member){
            succes
        }
    }
`;

export const setTaskDueTime = gql`
    mutation ($id: String!, $time: String) {
        setTaskDueTime(id: $id, time: $time){
            succes
        }
    }
`;

export const updateTaskDescription = gql`
    mutation ($id: String!, $description: String!) {
        updateTaskDescription(id: $id, description: $description){
            succes
        }
    }
`;
