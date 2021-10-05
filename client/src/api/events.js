import { gql } from "@apollo/client";

export const EVENTS = gql`
  query Events($projectId: String!) {
    eventsByProjectId (projectId: $projectId) {
      _id
      title
      description
      start
      end
      image {
        _id
        src
        createdAt
        size
      },
      state
    }
    holidaysEvent {
      title
      start
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $start: String!, $end: String, $description: String!, $projectId: String!, $file: Upload, $addedBy: String!, $projectTitle: String!) {
    addEvent (title: $title, start: $start, projectId: $projectId, end: $end, description: $description, file: $file, addedBy: $addedBy, projectTitle: $projectTitle) {
      _id
      title
      description
      start
      end
      image {
        _id
        src
        createdAt
        size
      },
      state
    }
  }
`;

export const DELETE_IMAGE_FROM_EVENT = gql`
  mutation deleteImageFromEvent($id: String!) {
    deleteImageFromEvent(id: $id) {
      succes
    }
  }
`;

export const ADD_IMAGE_TO_EVENT = gql`
  mutation addImageToEvent($id: String!, $addedBy: String!, $projectTitle: String! $file: Upload!) {
    addImageToEvent(id: $id, addedBy: $addedBy, projectTitle: $projectTitle, file: $file) {
      _id
      src
      createdAt
      size
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: String!, $title: String!, $start: String!, $description: String!, $end: String!) {
    updateEvent (id: $id, title: $title, start: $start, description: $description, end: $end) {
      _id
      description
      title
      start
      end
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent (id: $id) {
      id
    }
  }
`;

export const SHARED_LINKS_BY_PROJECTID = gql`
  query GetSharedSchedulesByProjecId($projectId: String!) {
    getSharedSchedulesByProjecId (projectId: $projectId) {
      id
      projectId
      start
      name
      end
      token
      cible {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const VERIFY_SHARED_SCHEDULE_TOKEN = gql`
  query VerifySharedScheduleToken($token: String!){
    verifySharedScheduleToken(token: $token){
      succes
    }
  }
`;

export const GET_SHARED_SCHEDULE_BY_TOKEN = gql`
  query GetSharedSchedule($token: String!){
    getSharedSchedule(token: $token){
      id
      title
      start
      startTime
      end
      projectId
      state
    }
  }

`;


export const GET_NOTES_BY_EVENT_ID = gql`
  query EventNotes($id: String!){
    eventNotes(id: $id){
      id
      message
      senderType
      sender
      recieverType
      reciever
      createdAt
      eventId
    }
  }
`;

export const SEND_NOTE = gql`
  mutation SendNotes($id: String!, $note: NoteInput){
    sendNotes(id: $id, note: $note){
      id
      message
      senderType
      sender
      recieverType
      reciever
      createdAt
      eventId
    }
  }
`;

export const NEW_NOTES_SUBSCRIPTION = gql`
  subscription NoteSend($eventId: String!, $listenerType: String!){
    noteSend(eventId: $eventId, listenerType: $listenerType){
      id
      message
      senderType
      sender
      recieverType
      reciever
      createdAt
      eventId
    }
  }
`;

export const UPDATE_EVENT_STATE_STATUS = gql`
  mutation UpdateEventState($id: String!, $state: String!){
    updateEventState(id: $id, state: $state){
    id 
    title 
    start 
    startTime 
    end    
    projectId 
    state 
    }
  }
`;


export const DELETE_CIBLE = gql`
  mutation DeleteUserFromScheduleLink($sharedLinkId: String!, $cibleId: String!){
    deleteUserFromScheduleLink(sharedLinkId: $sharedLinkId, cibleId: $cibleId){
      succes
    }
  }
`;

export const DELETE_SHARED_LINK = gql`
  mutation DeleteScheduleLink($id: String!){
    deleteScheduleLink(id: $id){
      succes
    }
  }
`;