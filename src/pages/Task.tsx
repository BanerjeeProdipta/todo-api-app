import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { addTask, changeCompletionStatus, removeTask, updateTask } from '../store/task/Actions';
import { IAddTask, ITask, IUpdateTask } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Task = () => {
  const dispatch = useDispatch();
  const [taskToAdd, setTaskToAdd] = useState<IAddTask>();
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [taskToEdit, setTaskToEdit] = useState<IUpdateTask>();
  const [taskEditFormVisibility, setTaskEditFormVisibility] = useState<boolean>(false);

  const tasks: ITask[] = useSelector((state: IReducer) => state.taskReducer.task);

  const addTodo = useCallback(() => {
    setTaskToAdd({
      title: title,
      body: body,
    });
  }, [title, body]);

  useEffect(() => {
    addTodo();
  }, [addTodo]);

  const handleAddTaskFromSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toast.info('Task Added');
    if (taskToAdd !== undefined) dispatch(addTask(taskToAdd));
    setTitle('');
    setBody('');
  };

  const editTodo = useCallback(() => {
    setTaskToEdit({
      id: id,
      title: title,
      body: body,
    });
  }, [id, title, body]);

  useEffect(() => {
    editTodo();
  }, [editTodo]);

  const handleEditTaskFromSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toast.info('Task Updated');
    if (taskToEdit !== undefined) dispatch(updateTask(taskToEdit));
    setTaskEditFormVisibility(false);
    setId('');
    setTitle('');
    setBody('');
  };

  const deleteTask = (task: ITask) => {
    toast.error('Task Deleted');
    if (task !== undefined) dispatch(removeTask(task));
  };

  const editTask = (task: ITask) => {
    setTaskEditFormVisibility(true);
    setTaskToEdit(task);
    setId(task.id);
    setTitle(task.title);
    setBody(task.body);
  };

  const handleCancel = () => {
    setTaskEditFormVisibility(false);
    setTitle('');
    setBody('');
  };

  const handleChangeCompletionStatus = (task: ITask) => {
    if (task.completionStatus === true) {
      task.completionStatus = false;
      toast('Task Complete');
    } else {
      task.completionStatus = true;
      toast('Task Incomplete');
    }
    dispatch(changeCompletionStatus(task));
  };

  console.log(tasks);

  const handleCheck = (task: ITask): boolean => {
    return task.completionStatus === true ? true : false;
  };

  return (
    <div className="mx-auto flex justify-center py-8 px-6 ">
      <div className="w-full md:max-w-5xl">
        {taskEditFormVisibility === false && (
          <form
            onSubmit={handleAddTaskFromSubmit}
            className="mb-6 border rounded shadow-sm px-6 py-4 space-y-4 bg-white w-full"
          >
            <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Add Task</p>
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="title"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border border-blue px-4 py-2 rounded w-full"
              rows={3}
              id="body"
              value={body}
              placeholder="Description"
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              className={`rounded px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white w-full flex justify-center ${
                !!title && !!body ? `` : `opacity-80 cursor-not-allowed`
              }`}
              type="submit"
              disabled={!!title && !!body ? false : true}
            >
              Save
            </button>
          </form>
        )}
        {taskEditFormVisibility === true && (
          <form
            onSubmit={handleEditTaskFromSubmit}
            className="mb-6 hover:shadow-sm border rounded shadow-sm px-6 py-4 space-y-4 bg-white w-full"
          >
            <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Edit Task {taskToEdit?.id}</p>
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="title"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border border-blue px-4 py-2 rounded w-full"
              rows={3}
              id="body"
              value={body}
              placeholder="Description"
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              className={`rounded px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white w-full flex justify-center ${
                !!title && !!body ? `` : `opacity-80 cursor-not-allowed`
              }`}
              type="submit"
              disabled={!!title && !!body ? false : true}
            >
              Update
            </button>
            <button
              className={`rounded px-4 py-2 text-blue-900 bg-blue-100 hover:bg-blue-200 w-full flex justify-center mt-2`}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        )}
        {tasks.length > 0 && (
          <div className="space-y-4 border rounded shadow-sm px-6 py-4 bg-white">
            {tasks.map((task: ITask) => (
              <div
                key={task.id}
                className={`p-4 border rounded ${task.completionStatus === true ? 'bg-gray-100' : 'hover:shadow-lg'}`}
              >
                <div className=" cursor-pointer" onClick={() => handleChangeCompletionStatus(task)}>
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 flex-shrink-0 mb-2"
                      type="checkbox"
                      id="completionStatus"
                      value={task.id}
                      onChange={() => handleChangeCompletionStatus(task)}
                      checked={handleCheck(task)}
                    ></input>
                    <p className="text-2xl font-semibold text-indigo-700 mb-2 ml-2">{task.title}</p>
                  </div>
                  <p>{task.body}</p>
                </div>

                <div className="space-x-2 mt-4">
                  <button
                    className="w-full sm:w-auto flex-none bg-white font-bold leading-6 text-blue-900 text-xs hover:bg-blue-900 hover:text-white px-4 border-blue-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-900 focus:outline-none transition-colors duration-200"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="w-full sm:w-auto flex-none bg-white font-bold leading-6 text-pink-900 text-xs hover:bg-pink-900 hover:text-white px-4 border-pink-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-900 focus:outline-none transition-colors duration-200"
                    onClick={() => deleteTask(task)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
