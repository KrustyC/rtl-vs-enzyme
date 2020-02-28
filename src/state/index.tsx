import * as React from 'react';
import * as PropTypes from 'prop-types';
import { APP_STATUS, ACTIONS, Todo, State } from './types';
import { todoReducer } from './reducer';

const initialState: State = {
  todos: [],
  status: APP_STATUS.OK,
};

const store = React.createContext(initialState);
const { Provider } = store;

const StateProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);

  const onAddTodo = (todoValue: string) => {
    const maxId = Math.max(...state.todos.map(({ id }) => id));

    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: {
        todo: {
          id: maxId + 1,
          value: todoValue,
        },
      },
    });
  };

  const onEditTodo = (id: number, newValue: string) => {
    const index = state.todos.findIndex(({ id: todoId }) => todoId === id);

    dispatch({
      type: ACTIONS.EDIT_TODO,
      payload: {
        index,
        value: newValue,
      },
    });
  };

  const onRemoveTodo = (id: number) => {
    const index = state.todos.findIndex(({ id: todoId }) => todoId === id);

    dispatch({
      type: ACTIONS.REMOVE_TODO,
      payload: { index },
    });
  };

  const onSorted = (sortedTodos: Todo[]) =>
    dispatch({
      type: ACTIONS.SORT_TODOS,
      payload: {
        todos: sortedTodos,
      },
    });

  const actions = {
    onAddTodo,
    onEditTodo,
    onRemoveTodo,
    onSorted,
  };

  return <Provider value={[state, actions]}>{children}</Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { store, StateProvider };
