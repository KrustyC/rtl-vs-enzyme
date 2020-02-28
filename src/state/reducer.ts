import { APP_STATUS, ACTIONS, Todo, State } from './types';

interface Action {
  type: string;
}

interface AddTodoAction extends Action {
  payload: {
    todo: Todo;
  };
}

interface EditTodoAction extends Action {
  payload: {
    index: number;
    value: string;
  };
}

interface RemoveTodoAction extends Action {
  payload: {
    index: number;
  };
}

interface SortTodoAction extends Action {
  payload: {
    todos: Todo[];
  };
}

const MAX_TODOS = 7;

const isAddAction = (action: Action): action is AddTodoAction => action.type === ACTIONS.ADD_TODO;

const isEditAction = (action: Action): action is EditTodoAction =>
  action.type === ACTIONS.EDIT_TODO;

const isRemoveAction = (action: Action): action is RemoveTodoAction =>
  action.type === ACTIONS.REMOVE_TODO;

const isSortAction = (action: Action): action is SortTodoAction =>
  action.type === ACTIONS.SORT_TODOS;

type TodoAction = AddTodoAction | EditTodoAction | RemoveTodoAction | SortTodoAction;

export const todoReducer = (state: State, action: TodoAction) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      if (!isAddAction(action)) {
        return state;
      }

      const { todos } = state;
      if (todos.length >= MAX_TODOS) {
        return { todos, status: APP_STATUS.ERROR };
      }

      return {
        todos: [...todos, action.payload.todo],
        status: APP_STATUS.OK,
      };
    }

    case ACTIONS.EDIT_TODO: {
      if (!isEditAction(action)) {
        return state;
      }

      const { index, value } = action.payload;
      const todo = state.todos[index];

      const updatedTodos = [
        ...state.todos.slice(0, index),
        { id: todo.id, value },
        ...state.todos.slice(index + 1),
      ];

      return {
        todos: updatedTodos,
        status: APP_STATUS.OK,
      };
    }

    case ACTIONS.REMOVE_TODO: {
      if (!isRemoveAction(action)) {
        return state;
      }

      const { index } = action.payload;
      const updatedTodos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];

      return {
        todos: updatedTodos,
        status: APP_STATUS.OK,
      };
    }

    case ACTIONS.SORT_TODOS: {
      if (!isSortAction(action)) {
        return state;
      }

      return {
        todos: action.payload.todos,
        status: APP_STATUS.OK,
      };
    }
    default:
      return state;
  }
};
