import * as React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';
import useDragAndDrop from './useDragAndDrop';

type DndProps = {
  items: array;
  itemHeight: number;
};

const Dnd = ({ items: oldItems, itemHeight }: DndProps) => {
  const [{ items, draggedId, dragOrder }, { handleDragEnd, handleDrag }] = useDragAndDrop({
    elements: oldItems,
    itemHeight,
  });

  return (
    <Container>
      {items.map((item, index) => {
        const isDragging = draggedId === item.id;
        const top = dragOrder.findIndex(({ id }) => id === item.id) * (itemHeight + 10);

        const draggedTop = index * (itemHeight + 10);

        return (
          <Draggable key={item.id} id={item.id} onDrag={handleDrag} onDragEnd={handleDragEnd}>
            <Rect isDragging={isDragging} top={isDragging ? draggedTop : top}>
              {item.label}
            </Rect>
          </Draggable>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

type RectProps = {
  top: number;
  isDragging: boolean;
};

const HEIGHT = 80;
const Rect = styled.div.attrs(({ isDragging }) => ({
  style: {
    transition: isDragging ? 'none' : 'all 500ms',
  },
}))<RectProps>`
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

export default Dnd;
