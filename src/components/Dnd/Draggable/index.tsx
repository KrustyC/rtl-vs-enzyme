import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useDraggable, { OnDragParams, Position } from './useDraggable';

type ContainerProps = {
  isDragging: boolean;
  translation: Position;
};

type DraggableProps = {
  children: any;
  id: number;
  onDrag: ({ translation, id }: OnDragParams) => void;
  onDragEnd: () => void;
};

const DraggableContainer = styled.div<ContainerProps>`
  ${({ isDragging, translation }) => css`
    cursor: ${isDragging ? '-webkit-grabbing' : '-webkit-grab'};
    transform: translate(${translation.x}px, ${translation.y}px);
    transition: ${isDragging ? 'none' : 'transform 500ms'};
    z-index: ${isDragging ? 2 : 1};
    position: ${isDragging ? 'absolute' : 'relative'};
  `}
`;

const Draggable: React.FunctionComponent<DraggableProps> = ({ children, ...rest }) => {
  const [{ isDragging, translation }, { handleMouseDown }] = useDraggable(rest);

  return (
    <DraggableContainer
      isDragging={isDragging}
      translation={translation}
      onMouseDown={handleMouseDown}
    >
      {children}
    </DraggableContainer>
  );
};

Draggable.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default Draggable;
