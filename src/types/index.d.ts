export interface ITask {
  id: number;
  completionStatus: boolean;
  title: string;
  body: string;
}

export interface IAddTask {
  title?: string;
  body?: string;
}
