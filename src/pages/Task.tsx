import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { addTask, removeTask } from '../store/task/Actions';
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

  return (
    <div className="mx-auto flex justify-center py-8 px-6">
      <div>
        <form onSubmit={handleSubmit} className="mb-8 border rounded shadow-sm px-6 py-4 space-y-4">
          <p className="text-2xl text-indigo-700 font-bold px-4 py-2 w-full">Add Task</p>
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
            className="rounded-lg px-4 py-1 bg-indigo-800 text-white"
            disabled={task === undefined ? true : false}
          >
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          {tasks.map((task: ITask) => (
            <div key={task.id}>
              <p>{task.id}</p>
              <p className="text-2xl font-semibold text-indigo-700 mb-2">{task.title}</p>
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
