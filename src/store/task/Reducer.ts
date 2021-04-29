import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ACTION_TYPES } from './Types';

export interface ITask {
 id:number
 title:string
 body:string
}

interface ITaskReducer {
  task: ITask[];
  addTask?: ITask[];
}

const InitialState: ITaskReducer = {
  task: [
    {
    id: 1,
    title: "post 1",
    body:
      "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
  },
  {
    id: 2,
    title: "post 2",
    body:
      "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
  }
]
};

const addTask = (state: ITaskReducer, action: any): ITaskReducer => {
  return {
    ...state,
    addTask: action.payload,
  };
};
const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      return addTask(state, action);
   
    default:
      return state;
  }
};

// persistor for QuestionReducer
const persistConfig = {
  key: 'questionReducer',
  storage: storage,
};

export const taskReducer = persistReducer(persistConfig, Reducer);
