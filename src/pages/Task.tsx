import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReducer } from '../store/IndexReducer';
import { ITask } from '../store/task/Reducer';

const Task = () => {
  const dispatch = useDispatch();

  const tasks: ITask[] = useSelector((state: IReducer) => state.taskReducer.task);

  const [task, setTask] = React.useState<ITask | {}>();

  return (
    <div>
      <div>
        {tasks.map((task: ITask) => (
          <div key={task.id}>
            <h1>{task.title}</h1>
            <p>{task.body}</p>
          </div>
        ))}
      </div>

      <form>
        <input type="text" id="title" placeholder="Title" />
        <input type="text" id="body" placeholder="Description" />
        <button disabled={task === undefined ? true : false}>Add Task</button>
      </form>
    </div>
  );
};

export default Task;
