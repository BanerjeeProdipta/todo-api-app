import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import TaskList from './TaskList';

toast.configure();

const Task = () => {
  const [taskEditFormVisibility, setTaskEditFormVisibility] = useState(false);
  const [lastAddedTask, setLastAddedTask] = useState<string>('');

  const handleChangeTaskEditFormVisibility = (taskEditFormVisibility: boolean) => {
    setTaskEditFormVisibility(taskEditFormVisibility);
  };

  const handleChangeTaskList = (lastAddedTask: string) => {
    setLastAddedTask(lastAddedTask);
  };
  return (
    <div className="mx-auto flex justify-center p-6">
      <div className="w-full md:max-w-5xl">
        {taskEditFormVisibility === false && <AddTaskForm handleChangeTaskList={handleChangeTaskList} />}
        {taskEditFormVisibility === true && (
          <EditTaskForm handleChangeTaskEditFormVisibility={handleChangeTaskEditFormVisibility} />
        )}
        <TaskList
          handleChangeTaskEditFormVisibility={handleChangeTaskEditFormVisibility}
          lastAddedTask={lastAddedTask}
        />
      </div>
    </div>
  );
};

export default Task;
