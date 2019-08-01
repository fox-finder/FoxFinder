import React from 'react';
import ReactDOM from 'react-dom';
import { Os } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Os />, div);
  ReactDOM.unmountComponentAtNode(div);
});
