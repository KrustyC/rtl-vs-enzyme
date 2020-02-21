import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  background: #07f;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 10px #c0c0c0;
`;

const P = styled.p`
  color: #fff;
`;
// .drag-drop-zone.inside-drag-area {
//   opacity: 0.7;
// }
// .dropped-files li {
//   color: #07F;
//   padding: 3px;
//   text-align: left;
//   font-weight: bold;
// }

export interface TodoProps {
  compiler: string;
  framework: string;
}

const Todo = () => <h1>This should be a todo</h1>;

export default Todo;
