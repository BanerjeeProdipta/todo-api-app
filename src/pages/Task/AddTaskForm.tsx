import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../components/config';
import { changeCompletionStatus } from '../../store/task/Actions';
import { IAddTask } from '../../types';

const initialTaskToAdd = {
  id: '',
  completionStatus: '',
  title: '',
  body: '',
};

const AddTaskForm = () => {
  const [taskToAdd, setTaskToAdd] = useState<IAddTask | any>();

  const handleAddTodo = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskToAdd({
      ...taskToAdd,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleAddTaskFromSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (taskToAdd !== undefined)
      try {
        await axios.post(`${BASE_URL}/`, { taskToAdd });
        toast.info('Task Added');
        setTaskToAdd({
          ...initialTaskToAdd,
        });
      } catch (e) {
        toast.error(e);
      }
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
          type="submit"
          className={`rounded px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white w-full flex justify-center ${
            !!taskToAdd?.title && !!taskToAdd?.body ? '' : 'cursor-not-allowed opacity-90'
          }`}
          disabled={!!taskToAdd?.title && !!taskToAdd?.body ? false : true}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
