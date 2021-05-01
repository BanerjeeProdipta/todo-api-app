import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { addTask, changeCompletionStatus, removeTask, updateTask } from '../store/task/Actions';
import { IAddTask, ITask, IUpdateTask } from '../types';

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
  }, [title, body]);

  useEffect(() => {
    editTodo();
  }, [editTodo]);

  const handleEditTaskFromSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (taskToEdit !== undefined) dispatch(updateTask(taskToEdit));
    setTitle('');
    setBody('');
  };

  const deleteTask = (task: ITask) => {
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
    } else task.completionStatus = true;
    dispatch(changeCompletionStatus(task));
  };

  return (
    <div className="mx-auto flex justify-center py-8 px-6">
      <div>
        {taskEditFormVisibility === false && (
          <form onSubmit={handleAddTaskFromSubmit} className="mb-8 border rounded shadow-sm px-6 py-4 space-y-4">
            <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Add Task</p>
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="title"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="body"
              value={body}
              placeholder="Description"
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              className={`rounded px-4 py-2 bg-indigo-800 text-white w-full flex justify-center ${
                !!title && !!body
                  ? ``
                  : `rounded px-4 py-2 bg-indigo-800 text-white w-full flex justify-center opacity-80 cursor-not-allowed`
              }`}
              type="submit"
              disabled={!!title && !!body ? false : true}
            >
              Save
            </button>
          </form>
        )}
        {taskEditFormVisibility === true && (
          <form onSubmit={handleEditTaskFromSubmit} className="mb-8 border rounded shadow-sm px-6 py-4 space-y-4">
            <p className="text-2xl text-indigo-700 font-bold py-2 w-full">Edit Task</p>
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="title"
              defaultValue={taskToEdit?.title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border border-blue px-4 py-2 rounded w-full"
              type="text"
              id="body"
              defaultValue={taskToEdit?.body}
              placeholder="Description"
              onChange={(e) => setBody(e.target.value)}
            />
            <button className={`rounded px-4 py-2 bg-indigo-800 text-white w-full flex justify-center`} type="submit">
              Update
            </button>
            <button
              className={`rounded px-4 py-2 bg-indigo-800 text-white w-full flex justify-center mt-2`}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        )}

        <div className="space-y-4">
          {tasks.map((task: ITask) => (
            <div key={task.id}>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 mb-2"
                  type="checkbox"
                  id="completionStatus"
                  value={task.id}
                  onChange={() => handleChangeCompletionStatus(task)}
                  defaultChecked={task.completionStatus === true}
                ></input>
                <p className="text-2xl font-semibold text-indigo-700 mb-2 ml-2">{task.title}</p>
              </div>
              <p>{task.body}</p>
              <div className="space-x-2 mt-4">
                <button className="bg-green-600 rounded text-xs text-white px-2 py-1" onClick={() => editTask(task)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(task)} className="bg-red-600 rounded text-xs text-white px-2 py-1">
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
