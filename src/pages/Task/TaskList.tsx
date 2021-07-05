import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { taskToEdit, changeCompletionStatus } from '../../store/task/Actions';
import { ITask } from '../../types';
import { BASE_URL } from '../../components/config';
import axios from 'axios';
import { v4 as uuid_v4 } from 'uuid';
uuid_v4();

interface props {
  handleChangeTaskEditFormVisibility: (visibility: boolean) => void;
  lastAddedTask: string;
}

const TaskList = ({ handleChangeTaskEditFormVisibility, lastAddedTask }: props) => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<ITask[]>();
  console.log(tasks);

  useEffect(() => {
    axios.get(`${BASE_URL}`).then((res) => setTasks(res.data));
  }, [lastAddedTask]);

  const handleDeleteTask = (taskID: string) => {
    axios
      .delete(`${BASE_URL}${taskID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.error('Task Deleted');
      })
      .catch((err) => console.log(err));
  };

  const handleEditTask = (task: ITask) => {
    handleChangeTaskEditFormVisibility(true);
    dispatch(taskToEdit(task));
  };

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

  return (
    <div className="space-y-4 rounded shadow-sm px-6 py-4 bg-white">
      {tasks && tasks.length > 0 ? (
        <div>
          {tasks.map((task: ITask) => (
            <div
              key={task.id}
              className={`p-4 rounded ${task.completionStatus === true ? 'bg-gray-50' : 'hover:shadow-lg'}`}
            >
              <div className="cursor-pointer">
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-indigo-700 mb-2">{task.title}</p>
                </div>
                <p>{task.body}</p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                <button
                  onClick={() => handleChangeCompletionStatus(task)}
                  className={`w-full sm:w-auto bg-white font-bold leading-6 text-xs hover:text-white px-4 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:outline-none transition-colors duration-200 ${
                    task.completionStatus
                      ? 'text-red-900 hover:bg-red-900 border-red-900 focus:ring-red-900'
                      : 'text-green-900 hover:bg-green-900 border-green-900 focus:ring-green-900'
                  }`}
                >
                  {task.completionStatus ? 'Incomplete' : 'Complete'}
                </button>
                <button
                  className="w-full sm:w-auto bg-white font-bold leading-6 text-blue-900 text-xs hover:bg-blue-900 hover:text-white px-4 border-blue-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-900 focus:outline-none transition-colors duration-200"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>

                <button
                  className="w-full sm:w-auto bg-white font-bold leading-6 text-pink-900 text-xs hover:bg-pink-900 hover:text-white px-4 border-pink-900 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-900 focus:outline-none transition-colors duration-200"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>{!!tasks && <p>No Tasks Found.</p>}</div>
      )}
    </div>
  );
};

export default TaskList;
