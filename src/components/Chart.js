import React from 'react';
import {Bar} from './components';

export const Chart = ({initialValues, maxTicks, height, isReadOnly, onValueChange}) => {
  const handleValueChange = index => value => {
    onValueChange(index, value);
  };

  return (
    <div className="chart">
      {
        initialValues.map((value, index) => (
          <Bar
            key={index}
            maxHeight={height}
            left={10 + index * 100}
            width={80}
            isReadOnly={isReadOnly}
            maxTicks={maxTicks}
            initialValue={value}
            onValueChange={handleValueChange(index)}
          />
        ))
      }
    </div>
  );
};
