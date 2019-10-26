import {useEffect, useReducer} from 'react';
import {ActionCreators, reducer} from './barDragStateReducer.ts';

export const useBarDragState = ({
  dragHandle,
  maxHeight,
  isReadOnly,
  maxTicks,
  initialValue,
  onValueChange
}) => {
  const [{height, top, value, isMouseDown}, dispatch] = useReducer(reducer, {
    maxHeight,
    value: initialValue,
    isMouseDown: false,
    isReadOnly
  });

  useEffect(() => {
    const handle = dragHandle.current;

    const handleMouseMove = ({movementY}) => {
      if (isMouseDown) {
        if (height < 0 || height > maxHeight) {
          // stop dragging when height out of bounds
          dispatch(ActionCreators.setMouseDownStatus(true));
        } else {
          dispatch(ActionCreators.updateDragData(movementY));
        }
      }
    };

    const handleMouseDown = () => {
      dispatch(ActionCreators.setMouseDownStatus(true));
    };

    const handleMouseUp = () => {
      if (isMouseDown) {
        dispatch(ActionCreators.snapToClosestTick());
        dispatch(ActionCreators.setMouseDownStatus(false));
        onValueChange(value);
      }
    };

    handle.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      handle.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragHandle, maxHeight, height, isMouseDown, onValueChange, value]);

  useEffect(() => {
    dispatch(ActionCreators.initialiseDragData(maxTicks));
  }, [maxTicks]);

  return {height, top, value, isMouseDown};
};
