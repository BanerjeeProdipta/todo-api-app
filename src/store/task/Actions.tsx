import { IAddTask, ITask } from '../../types';
import { ACTION_TYPES } from './Types';

export const addTask = (payload: IAddTask) => {
  return { type: ACTION_TYPES.ADD_TASK, payload };
};
export const removeTask = (payload: ITask) => {
  return { type: ACTION_TYPES.REMOVE_TASK, payload };
};
export const changeCompletionStatus = (payload: ITask) => {
  return { type: ACTION_TYPES.CHANGE_COMPLETION_STATUS, payload };
};
