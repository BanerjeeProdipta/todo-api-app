import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ITask } from '../../types';
import { ACTION_TYPES } from './Types';
import { v4 as uuid_v4 } from 'uuid';
uuid_v4();

interface ITaskReducer {
  tasks: ITask[];
  taskToEdit: ITask;
}

const InitialState: ITaskReducer = {
  tasks: [
    {
      id: '1',
      completionStatus: false,
      title: 'Task 1',
      body: 'Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi',
    },
    {
      id: '2',
      completionStatus: true,
      title: 'Task 2',
      body: 'Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint',
    },
  ],
  taskToEdit: { id: '', completionStatus: false, title: ' ', body: '' },
};

const addTask = (state: ITaskReducer, action: any): ITaskReducer => {
  const newTask: ITask = {
    id: uuid_v4(),
    completionStatus: false,
    title: action.payload.title,
    body: action.payload.body,
  };

  return {
    ...state,
    tasks: state.tasks.concat(newTask),
  };
};

const removeTask = (state: ITaskReducer, action: any): ITaskReducer => {
  const tasks: ITask[] = state.tasks.filter((task) => task.id !== action.payload.id);
  return {
    ...state,
    tasks: tasks,
  };
};

const changeCompletionStatus = (state: ITaskReducer, action: any): ITaskReducer => {
  const tasks: ITask[] = state.tasks;

  const allTask = tasks.map((v) => {
    if (v.id === action.payload.id) {
      v.completionStatus = action.payload.completionStatus;
    }
    return v;
  });

  return {
    ...state,
    tasks: allTask,
  };
};

const editTask = (state: ITaskReducer, action: any): ITaskReducer => {
  return {
    ...state,
    taskToEdit: action.payload,
  };
};

const updateTask = (state: ITaskReducer, action: any): ITaskReducer => {
  const tasks: ITask[] = state.tasks;

  const allTask = tasks.map((v) => {
    if (v.id === action.payload.id) {
      v.title = action.payload.title;
      v.body = action.payload.body;
    }
    return v;
  });

  return {
    ...state,
    tasks: allTask,
  };
};

const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      return addTask(state, action);

    case ACTION_TYPES.REMOVE_TASK:
      return removeTask(state, action);

    case ACTION_TYPES.CHANGE_COMPLETION_STATUS:
      return changeCompletionStatus(state, action);

    case ACTION_TYPES.EDIT_TASK:
      return editTask(state, action);

    case ACTION_TYPES.UPDATE_TASK:
      return updateTask(state, action);

    default:
      return state;
  }
};

// persister
const persistConfig = {
  key: 'tasks',
  storage: storage,
};

export const taskReducer = persistReducer(persistConfig, Reducer);
