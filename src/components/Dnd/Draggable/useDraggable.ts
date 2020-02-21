import * as React from 'react';

const INITIAL_POSITION = { x: 0, y: 0 };

type MousePosition = {
  clientX: number;
  clientY: number;
};

export type Position = {
  x: number;
  y: number;
};

export type OnDragParams = {
  translation: Position;
  id: number;
};

type UseDraggableParams = {
  id: number;
  onDrag: ({ translation, id }: OnDragParams) => void;
  onDragEnd: () => void;
};

const useDraggable = ({ id, onDragEnd, onDrag }: UseDraggableParams) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [translation, setTranslation] = React.useState(INITIAL_POSITION);
  const [origin, setOrigin] = React.useState(INITIAL_POSITION);

  const handleMouseDown = React.useCallback(({ clientX, clientY }: MousePosition) => {
    setIsDragging(true);
    setOrigin({ x: clientX, y: clientY });
  }, []);

  const handleMouseMove = React.useCallback(
    ({ clientX, clientY }: MousePosition) => {
      const newTranslation = {
        x: clientX - origin.x,
        y: clientY - origin.y,
      };
      setTranslation(newTranslation);
      onDrag({ translation: newTranslation, id });
    },
    [origin, onDrag, id],
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
    onDragEnd();
  }, [onDragEnd]);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      setTranslation(INITIAL_POSITION);
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return [{ isDragging, translation }, { handleMouseDown }];
};

export default useDraggable;
