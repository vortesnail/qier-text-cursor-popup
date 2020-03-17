import React from 'react';
import ReactDOM from 'react-dom';

import Hello from '../src';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.querySelector('#example'),
);
