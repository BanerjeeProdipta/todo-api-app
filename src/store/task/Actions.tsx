import { IAddTask } from './Reducer';
import { ACTION_TYPES } from './Types';

export const addTask = (payload: IAddTask) => {
  return { type: ACTION_TYPES.ADD_TASK, payload };
};
