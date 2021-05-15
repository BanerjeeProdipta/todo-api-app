export interface ITask {
  id: string;
  completionStatus: boolean;
  title: string;
  body: string;
}

export interface IAddTask {
  title: string;
  body: string;
}

export interface IUpdateTask {
  id: string;
  title: string;
  body: string;
}

export interface ITaskResponse {
  data: ITask[];
}
