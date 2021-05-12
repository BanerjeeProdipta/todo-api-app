import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addTask } from '../../store/task/Actions';
import { IAddTask } from '../../types';

const initialTaskToAdd = {
  title: '',
  body: '',
};

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [taskToAdd, setTaskToAdd] = useState<IAddTask | any>();

  const handleAddTodo = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskToAdd({
      ...taskToAdd,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleAddTaskFromSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (taskToAdd !== undefined) dispatch(addTask(taskToAdd));
    toast.info('Task Added');
    setTaskToAdd({
      ...initialTaskToAdd,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleAddTaskFromSubmit}
        className="mb-6 border rounded shadow-sm px-6 py-4 space-y-4 bg-white w-full"
      >
        <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Add Task</p>
        <input
          className="border border-blue px-4 py-2 rounded w-full"
          type="text"
          id="title"
          value={taskToAdd?.title ? taskToAdd?.title : ''}
          placeholder="Title"
          onChange={handleAddTodo}
        />
        <input
          className="border border-blue px-4 py-2 rounded w-full"
          id="body"
          value={taskToAdd?.body ? taskToAdd?.body : ''}
          placeholder="Description"
          onChange={handleAddTodo}
        />
        <button
          className={`rounded px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white w-full flex justify-center`}
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
