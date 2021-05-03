import { gql } from "@apollo/client";

export const EVENTS = gql`
  query Events($projectId: String!) {
    eventsByProjectId (projectId: $projectId) {
      id
      title
      start
      startTime
      end
      projectId
    }
    holidaysEvent {
      title
      start
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $start: String!, $projectId: String!) {
    addEvent (title: $title, start: $start, projectId: $projectId) {
      id
      startTime
      title
      start
      projectId
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: String!, $title: String!, $start: String!) {
    updateEvent (id: $id, title: $title, start: $start) {
      id
      startTime
      title
      start
      projectId
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
      cible {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
