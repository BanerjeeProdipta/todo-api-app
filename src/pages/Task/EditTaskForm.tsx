import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IReducer } from '../../store/IndexReducer';
import { updateTask } from '../../store/task/Actions';
import { ITask } from '../../types';

interface props {
  handleChangeTaskEditFormVisibility: (visibility: boolean) => void;
}

const EditTaskForm = ({ handleChangeTaskEditFormVisibility }: props) => {
  const dispatch = useDispatch();
  const [taskToEdit, setTaskToEdit] = useState<ITask | any>();

  const task: ITask = useSelector((state: IReducer) => state.taskReducer.taskToEdit);

  useEffect(() => {
    setTaskToEdit(task);
  }, [task]);

  const handleEditTodo = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskToEdit({
      ...taskToEdit,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleEditTaskFromSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (taskToEdit !== undefined) dispatch(updateTask(taskToEdit));
    toast.info('Task Updated');
    handleChangeTaskEditFormVisibility(false);
  };

  return (
    <div>
      <form
        onSubmit={handleEditTaskFromSubmit}
        className="mb-6 hover:shadow-sm border rounded shadow-sm px-6 py-4 space-y-4 bg-white w-full"
      >
        <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Edit Task {taskToEdit?.id}</p>
        <input
          className="border border-blue px-4 py-2 rounded w-full"
          type="text"
          id="title"
          value={taskToEdit?.title ? taskToEdit?.title : ''}
          placeholder="Title"
          onChange={handleEditTodo}
        />
        <input
          className="border border-blue px-4 py-2 rounded w-full"
          id="body"
          value={taskToEdit?.body ? taskToEdit?.body : ''}
          placeholder="Description"
          onChange={handleEditTodo}
        />
        <button
          type="submit"
          className={`rounded px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white w-full flex justify-center`}
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => handleChangeTaskEditFormVisibility(false)}
          className={`rounded px-4 py-2 text-blue-900 bg-blue-100 hover:bg-blue-200 w-full flex justify-center mt-2 ${
            !!taskToEdit?.title && !!taskToEdit?.body ? '' : 'cursor-not-allowed opacity-90'
          }`}
          disabled={!!taskToEdit?.title && !!taskToEdit?.body ? false : true}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
