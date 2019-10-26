import React from 'react';
import './styles.css';
import {Histogram} from './Histogram';

export const App = () =>
  <Histogram
    initialValues={[4, 3, 0, 8]}
    initialMaxTicks={15}
    height={540}
    isReadOnly={false}
  />;
