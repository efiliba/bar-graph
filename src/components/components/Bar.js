import React, {useRef} from 'react';
import classNames from 'classnames';
import {useBarDragState} from './useBarDragState';
import {MarkerLine} from './MarkerLine';

export const Bar = ({
  maxHeight,
  left,
  width,
  isReadOnly,
  maxTicks,
  initialValue,
  onValueChange
}) => {
  const dragHandle = useRef(null);

  const {height, top, value, isMouseDown} = useBarDragState({
    dragHandle,
    maxHeight,
    isReadOnly,
    maxTicks,
    initialValue,
    onValueChange
  });

  return (
    <>
      {isMouseDown &&
        <MarkerLine top={top} value={value} />
      }
      <div
        className={classNames('bar', {'bar--disable': isReadOnly, 'bar--mouse-down': isMouseDown})}
        style={{height: height, top: top, left, width}}
      >
        <div
          className={classNames('drag-handle', {'drag-handle--disable': isReadOnly})}
          ref={dragHandle}
        />
      </div>
    </>
  );
};
