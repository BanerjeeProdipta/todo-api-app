import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { addTask } from '../store/task/Actions';
import { IAddTask, ITask } from '../store/task/Reducer';

const Task = () => {
  const dispatch = useDispatch();
  const [task, setTask] = React.useState<IAddTask | {}>();

  const tasks: ITask[] = useSelector((state: IReducer) => state.taskReducer.task);

  const handleSubmit = () => {
    if (task !== undefined) dispatch(addTask(task));
  };

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [e.currentTarget.id]: e.currentTarget.value,
    });
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
              <p className="text-2xl font-semibold text-indigo-700 mb-2">{task.title}</p>
              <p>{task.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
