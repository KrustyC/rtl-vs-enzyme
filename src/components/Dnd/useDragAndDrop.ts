import * as React from 'react';
import { inRange } from 'lodash';

type Item = {
  id: number;
};

type UseDragAndDropParams = {
  elements: any;
  itemHeight: number;
};

const useDragAndDrop = ({ elements, itemHeight }: UseDragAndDropParams) => {
  const [items, setItems] = React.useState(elements);
  const [dragOrder, setDragOrder] = React.useState(elements);
  const [draggedId, setDraggedId] = React.useState(null);

  const handleDrag = React.useCallback(
    ({ translation, id: currentItemId }): any => {
      const delta = Math.round(translation.y / itemHeight);
      const index = items.findIndex(({ id }: Item) => id === currentItemId);
      const item = items[index];

      const newIndex = index + delta;
      if (!inRange(newIndex, 0, items.length)) {
        return;
      }

      const remainingItems = items.filter(({ id }: Item) => id !== currentItemId);
      const newDragOrder = [
        ...remainingItems.slice(0, newIndex),
        item,
        ...remainingItems.slice(newIndex),
      ];

      setDraggedId(currentItemId);
      setDragOrder(newDragOrder);
    },
    [items, itemHeight],
  );

  const handleDragEnd = React.useCallback(() => {
    setItems(dragOrder);
    setDraggedId(null);
  }, [dragOrder]);

  return [
    { items, dragOrder, draggedId },
    { handleDrag, handleDragEnd },
  ];
};

export default useDragAndDrop;
