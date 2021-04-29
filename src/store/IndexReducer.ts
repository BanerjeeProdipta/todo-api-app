import { combineReducers } from 'redux';
import { taskReducer } from './task/Reducer';

export const rootReducer = combineReducers({ taskReducer });
export type IReducer = ReturnType<typeof rootReducer>;
