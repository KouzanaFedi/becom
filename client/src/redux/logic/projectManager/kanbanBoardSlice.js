import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const kanbanBoard = createSlice({
    name: "kanbanBoard",
    initialState: {
        project: {
            id: "",
            name: "",
            owner: ""
        },
        taskTypes: [],
        board: {
            lanes: [
                {
                    id: 'todo',
                    title: 'Todo',
                    label: 'Supp',
                    cards: [],
                },
                {
                    id: 'doing',
                    title: 'Doing',
                    label: 'Supp',
                    cards: [],
                },
                {
                    id: 'toreview',
                    title: 'To review',
                    label: 'Supp',
                    cards: [],
                },
                {
                    id: 'done',
                    title: 'Done',
                    label: 'Supp',
                    cards: [],
                }
            ]
        },
        createdTaskForm: {
            taskType: "",
            title: {
                value: "",
                error: null,
                ready: false
            },
            startDate: new moment().format("yyyy-MM-DD hh:mm"),
            endDate: new moment().format("yyyy-MM-DD hh:mm"),
            description: {
                value: "",
                error: null,
                ready: false
            }
        }
    },
    reducers: {
        INIT_BOARD: (state, action) =>
        {
            state.board.lanes.forEach((lane) =>
            {
                lane.cards = [];
            });
            const { data } = action.payload;
            const { id, name, owner, tasks } = data;

            state.project = {
                id,
                name,
                owner
            }

            const todos = [];
            const doing = [];
            const done = [];
            const toReview = [];

            tasks.forEach(task =>
            {
                const { id, name, state, start, end, description, assignedTo, priority } = task;
                const card = {
                    id,
                    title: name,
                    description,
                    metadata: {
                        start,
                        end,
                        assignedTo,
                        priority
                    }
                };

                if (state === "todo") {
                    todos.push(card);
                } else if (state === "doing") {
                    doing.push(card);
                } else if (state === "done") {
                    done.push(card);
                } else {
                    toReview.push(card);
                }
            });

            const todoId = state.board.lanes.findIndex((lane) => lane.id === "todo");
            const doingId = state.board.lanes.findIndex((lane) => lane.id === "doing");
            const doneId = state.board.lanes.findIndex((lane) => lane.id === "done");
            const toReviewId = state.board.lanes.findIndex((lane) => lane.id === "toreview");

            todos.sort((a, b) => b.metadata.priority - a.metadata.priority);
            doing.sort((a, b) => b.metadata.priority - a.metadata.priority);
            done.sort((a, b) => b.metadata.priority - a.metadata.priority);
            toReview.sort((a, b) => b.metadata.priority - a.metadata.priority);

            state.board.lanes[todoId].cards = todos;
            state.board.lanes[doingId].cards = doing;
            state.board.lanes[doneId].cards = done;
            state.board.lanes[toReviewId].cards = toReview;

        },
        UPDATE_KENBAN_STORE: (state, action) =>
        {
            const { newData } = action.payload;
            const { lanes } = newData;
            state.board.lanes = lanes;
        },
        UPDATE_CARD_STATE: (state, action) =>
        {
            const { id, toState, fromState } = action.payload;
            const laneFromId = state.board.lanes.findIndex((lane) => lane.id === fromState);
            const cardId = state.board.lanes[laneFromId].cards.findIndex((card) => card.id === id);
            const cardToMove = state.board.lanes[laneFromId].cards[cardId];
            const laneToId = state.board.lanes.findIndex((lane) => lane.id === toState);
            state.board.lanes[laneToId].cards.push(cardToMove);
            state.board.lanes[laneFromId].cards.splice(cardId, 1);
        },
        INIT_TASK_TYPES_OPTIONS: (state, action) =>
        {
            const { taskTypes } = action.payload;
            taskTypes.forEach((type) =>
            {
                const { id, name } = type;
                state.taskTypes.push({
                    id,
                    name
                });
            });
        },
        SET_CREATE_TASK_TASK_TYPE: (state, action) =>
        {
            const { type } = action.payload;
            state.createdTaskForm.taskType = type;
        },
        SET_CREATE_TASK_TITLE: (state, action) =>
        {
            state.createdTaskForm.title.value = action.payload.title;
            if (state.createdTaskForm.title.value.length === 0)
                state.createdTaskForm.title.error = "Obligatory field";
            else state.createdTaskForm.title.error = null;
            state.createdTaskForm.title.ready = state.createdTaskForm.title.error === null;
        },
        SET_TASK_START_DATE: (state, action) =>
        {
            state.createdTaskForm.startDate = action.payload.startDate;
        },
        SET_TASK_END_DATE: (state, action) =>
        {
            state.createdTaskForm.endDate = action.payload.endDate;
        },
        SET_TASK_DESCRIPTION: (state, action) =>
        {
            state.createdTaskForm.description.value = action.payload.description;
            if (state.createdTaskForm.description.value.length === 0)
                state.createdTaskForm.description.error = "Obligatory field";
            else state.createdTaskForm.description.error = null;
            state.createdTaskForm.description.ready = state.createdTaskForm.description.error === null;
        },
        ADD_CREATED_CARD: (state, action) =>
        {
            const { id, name, description, start, end, assignedTo, priority } = action.payload;
            const todoIndex = state.board.lanes.findIndex((lane) => lane.id === "todo");
            state.board.lanes[todoIndex].cards.push({
                id,
                title: name,
                description,
                metadata: {
                    start,
                    end,
                    assignedTo,
                    priority
                }
            });
            state.createdTaskForm = {
                taskType: "",
                title: {
                    value: "",
                    error: null,
                    ready: false
                },
                startDate: new moment().format("yyyy-MM-DD hh:mm"),
                endDate: new moment().format("yyyy-MM-DD hh:mm"),
                description: {
                    value: "",
                    error: null,
                    ready: false
                }
            };
        }
    }
});

export const { UPDATE_KENBAN_STORE, INIT_BOARD, UPDATE_CARD_STATE, INIT_TASK_TYPES_OPTIONS, SET_CREATE_TASK_TASK_TYPE, SET_CREATE_TASK_TITLE, SET_TASK_START_DATE, SET_TASK_END_DATE, SET_TASK_DESCRIPTION, ADD_CREATED_CARD } = kanbanBoard.actions;

export const boardData = (state) => state.kanbanBoard.board;
export const boardTaskTypes = (state) => state.kanbanBoard.taskTypes;
export const boardCreatedTaskForm = (state) => state.kanbanBoard.createdTaskForm;
export const boardCreatedTaskFormCanSend = (state) => state.kanbanBoard.createdTaskForm.createdTaskForm !== "" && state.kanbanBoard.createdTaskForm.title.ready && state.kanbanBoard.createdTaskForm.description.ready;

export default kanbanBoard.reducer;