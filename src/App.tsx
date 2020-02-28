import * as React from 'react';
import styled from 'styled-components';
import { StateProvider } from './state';
import Dnd from './components/Dnd';

type TodoProps = {
  top: number;
  isDragging: boolean;
};

const HEIGHT = 80;

const Todo = styled.div.attrs(({ isDragging }) => ({
  style: {
    transition: isDragging ? 'none' : 'all 500ms',
  },
}))<TodoProps>`
  width: 300px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;

const todos = [
  { id: 1, label: 'Clean the room' },
  { id: 2, label: 'Make dinner' },
  { id: 3, label: 'Go shopping' },
  { id: 4, label: 'Write some code' },
  { id: 5, label: 'Have fun' },
];

const App = () => {
  return (
    <StateProvider>
      <div>
        <Dnd items={todos} itemHeight={80} />
      </div>
    </StateProvider>
  );
};

// {todos.map(todo => (
//   <Todo key={todo.id} id={todo.id}>
//     {todo.label}
//   </Todo>
// ))}
// </Dnd>

export default App;
