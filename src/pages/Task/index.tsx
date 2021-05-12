import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import TaskList from './TaskList';

toast.configure();

const Task = () => {
  const [taskEditFormVisibility, setTaskEditFormVisibility] = useState(false);

  const handleChangeTaskEditFormVisibility = (taskEditFormVisibility: boolean) => {
    setTaskEditFormVisibility(taskEditFormVisibility);
  };

  console.log(taskEditFormVisibility);

  return (
    <div className="mx-auto flex justify-center py-8 px-6 ">
      <div className="w-full md:max-w-5xl">
        {taskEditFormVisibility === false && <AddTaskForm />}
        {taskEditFormVisibility === true && (
          <EditTaskForm handleChangeTaskEditFormVisibility={handleChangeTaskEditFormVisibility} />
        )}
        <TaskList handleChangeTaskEditFormVisibility={handleChangeTaskEditFormVisibility} />
      </div>
    </div>
  );
};

export default Task;
