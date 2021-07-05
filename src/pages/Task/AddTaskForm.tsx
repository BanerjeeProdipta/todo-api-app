import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../components/config';
import { IAddTask } from '../../types';
import { v4 as uuid_v4 } from 'uuid';
uuid_v4();

interface props {
  handleChangeTaskList: (lastAddedTask: string) => void;
}

const initialTaskToAdd = {
  id: '',
  completionStatus: '',
  title: '',
  body: '',
};

const AddTaskForm = ({ handleChangeTaskList }: props) => {
  const [taskToAdd, setTaskToAdd] = useState<IAddTask | any>();

  const handleAddTodo = (e: any) => {
    const { id, value } = e.target;
    setTaskToAdd({
      ...taskToAdd,
      [id]: value,
    });
  };

  const handleAddTaskFromSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (taskToAdd !== undefined)
      try {
        //TODO:: Refactor API to send Object
        await axios
          .post(`${BASE_URL}`, { id: uuid_v4(), completionStatus: false, title: taskToAdd.title, body: taskToAdd.body })
          .then((response) => {
            console.log(response.data.body);
            if (response.data.statusCode === 200) {
              toast.info('Task Added');
              setTaskToAdd({
                ...initialTaskToAdd,
              });
              handleChangeTaskList(uuid_v4());
            } else {
              toast.error(response.data.body);
            }
          })
          .catch((error) => {
            console.log(error);
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
          className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
          type="text"
          id="title"
          value={taskToAdd?.title ? taskToAdd?.title : ''}
          placeholder="Title"
          onChange={handleAddTodo}
        />
        <textarea
          rows={4}
          className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent "
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
