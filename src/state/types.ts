export enum APP_STATUS {
  OK = 'OK',
  ERROR = 'ERROR',
}

export enum ACTIONS {
  ADD_TODO = 'TODO/ADD',
  EDIT_TODO = 'TODO/EDIT',
  REMOVE_TODO = 'TODO/REMOVE',
  SORT_TODOS = 'TODOS/SORT',
}

export type Todo = {
  id: number;
  value: string;
};

export interface State {
  todos: Todo[];
  status: APP_STATUS;
}

export interface Action {
  type: ACTIONS;
  payload: any;
}
