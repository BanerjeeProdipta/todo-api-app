import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { changeCompletionStatus, removeTask, taskToEdit } from '../store/task/Actions';
import { ITask } from '../types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _AddTaskForm from './_AddTaskForm';
import _EditTaskForm from './_EditTaskForm';

toast.configure();

const Task = () => {
  const dispatch = useDispatch();
  const [taskEditFormVisibility, setTaskEditFormVisibility] = useState(false);

  const tasks: ITask[] = useSelector((state: IReducer) => state.taskReducer.tasks);

  const handleDeleteTask = (task: ITask) => {
    if (task !== undefined) dispatch(removeTask(task));
    toast.error('Task Deleted');
  };

  const handleEditTask = (task: ITask) => {
    console.log(task);
    setTaskEditFormVisibility(true);
    dispatch(taskToEdit(task));
  };

  useEffect(() => {}, []);

  const handleChangeCompletionStatus = (task: ITask) => {
    if (task.completionStatus === true) {
      task.completionStatus = false;
      toast('Task Incomplete');
    } else {
      task.completionStatus = true;
      toast('Task Complete');
    }
    dispatch(changeCompletionStatus(task));
  };

  const handleCheck = (task: ITask): boolean => {
    return task.completionStatus === true ? true : false;
  };

  return (
    <div className="mx-auto flex justify-center py-8 px-6 ">
      <div className="w-full md:max-w-5xl">
        {taskEditFormVisibility === false && <_AddTaskForm />}
        {taskEditFormVisibility === true && <_EditTaskForm />}
        {tasks.length > 0 && (
          <div className="space-y-4 border rounded shadow-sm px-6 py-4 bg-white">
            {tasks.map((task: ITask) => (
              <div
                key={task.id}
                className={`p-4 border rounded ${task.completionStatus === true ? 'bg-gray-50' : 'hover:shadow-lg'}`}
              >
                <div className="cursor-pointer" onClick={() => handleChangeCompletionStatus(task)}>
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 flex-shrink-0 mb-2"
                      type="checkbox"
                      id="completionStatus"
                      checked={handleCheck(task)}
                      onChange={() => handleChangeCompletionStatus(task)}
                    ></input>
                    <p className="text-2xl font-semibold text-indigo-700 mb-2 ml-2">{task.title}</p>
                  </div>
                  <p>{task.body}</p>
                </div>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4">
                  <button
                    className="w-full sm:w-auto bg-white font-bold leading-6 text-blue-900 text-xs hover:bg-blue-900 hover:text-white px-4 border-blue-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-900 focus:outline-none transition-colors duration-200"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="w-full sm:w-auto bg-white font-bold leading-6 text-pink-900 text-xs hover:bg-pink-900 hover:text-white px-4 border-pink-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-900 focus:outline-none transition-colors duration-200"
                    onClick={() => handleDeleteTask(task)}
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
