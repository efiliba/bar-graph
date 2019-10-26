import React, {useState} from 'react';
import {RangeSelector, AxisY, Chart} from './components';

const MIN_RANGE_SELECTOR_VALUE = 5; // Enfource a minimum

export const Histogram = ({initialValues, initialMaxTicks, height, isReadOnly}) => {
  const [values, setValues] = useState(initialValues);
  const [maxTicks, setMaxTicks] = useState(initialMaxTicks);

  const handleValueChange = (index, value) => {
    setValues(values => {
      values[index] = value;
      return values;
    });
  };

  return (
    <div className="histogram">
      <RangeSelector
        value={maxTicks}
        min={Math.max(...values, MIN_RANGE_SELECTOR_VALUE)}
        isReadOnly={isReadOnly}
        onChange={setMaxTicks}
      />
      <AxisY maxTicks={maxTicks} step={5} />
      <Chart
        initialValues={values}
        maxTicks={maxTicks}
        height={height}
        isReadOnly={isReadOnly}
        onValueChange={handleValueChange}
      />
    </div>
  );
};
