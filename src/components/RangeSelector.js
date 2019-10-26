import React from 'react';

export const RangeSelector = ({value, min, step = 1, isReadOnly, onChange}) => {
  const handleChange = e => {
    onChange(+e.target.value);
  };

  return (
    <div className="range-selector">
      <label className="range-selector__label">Y-Axis Maximum:</label>
      <input
        className="range-selector__input"
        type="number"
        max={30}
        min={min}
        step={step}
        value={value}
        disabled={isReadOnly}
        onChange={handleChange}
      />
    </div>
  );
};
