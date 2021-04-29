import { ITask } from './Reducer';
import { ACTION_TYPES } from './Types';

export const addTaskAction = (payload: ITask[]) => {
  return { type: ACTION_TYPES.ADD_TASK, payload };
};