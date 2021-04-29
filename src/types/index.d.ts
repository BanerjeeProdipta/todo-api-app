export interface ITask {
  id: number;
  title: string;
  body: string;
}

export interface IAddTask {
  title?: string;
  body?: string;
}
