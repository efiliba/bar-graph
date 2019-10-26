import React from 'react';

export const MarkerLine = ({top, value}) =>
  <div className="marker-line" style={{top, zIndex: 999}}>
    <div className="marker-line__value">{value}</div>
  </div>;
