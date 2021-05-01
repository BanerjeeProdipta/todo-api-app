import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { addTask, changeCompletionStatus, removeTask } from '../store/task/Actions';
import { IAddTask, ITask } from '../types';

const Task = () => {
  const dispatch = useDispatch();
  const [task, setTask] = React.useState<IAddTask | {}>();

  const tasks: ITask[] = useSelector((state: IReducer) => state.taskReducer.task);

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    if (task !== undefined) dispatch(addTask(task));
  };

  const deleteTask = (task: ITask) => {
    if (task !== undefined) dispatch(removeTask(task));
  };

  const handleChangeCompletionStatus = (task: ITask) => {
    if (task.completionStatus === true) {
      task.completionStatus = false;
    } else task.completionStatus = true;
    dispatch(changeCompletionStatus(task));
  };

  return (
    <div className="mx-auto flex justify-center py-8 px-6">
      <div>
        <form onSubmit={handleSubmit} className="mb-8 border rounded shadow-sm px-6 py-4 space-y-4">
          <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Add Task</p>
          <input
            className="border border-blue px-4 py-2 rounded w-full"
            type="text"
            id="title"
            placeholder="Title"
            onChange={handleArticleData}
          />
          <input
            className="border border-blue px-4 py-2 rounded w-full"
            type="text"
            id="body"
            placeholder="Description"
            onChange={handleArticleData}
          />
          <button
            className={`rounded-lg px-4 py-2 bg-indigo-800 text-white w-full flex justify-center ${
              task === undefined && 'opacity-60 cursor-not-allowed'
            }`}
            disabled={task === undefined ? true : false}
          >
            Save
          </button>
        </form>

        <div className="space-y-4">
          {tasks.map((task: ITask) => (
            <div key={task.id}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="completionStatus"
                  value={task.id}
                  onClick={() => handleChangeCompletionStatus(task)}
                  defaultChecked={task.completionStatus === true}
                ></input>
                <p className="text-2xl font-semibold text-indigo-700 mb-2 ml-2">{task.title}</p>
              </div>
              <p>{task.body}</p>
              <button onClick={() => deleteTask(task)} className="bg-red-600 rounded text-xs text-white px-2 py-1">
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
