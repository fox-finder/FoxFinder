
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { MacOS } from './systems/macOS';
import { Win95 } from './systems/win95';
import { WinXP } from './systems/winXP';
import { Windows } from './systems/windows';

import 'normalize.css';
import './styles/os.scss';

export const App: React.FC = observer(() => {
  // return <Win95 />
  // return <WinXP />
  // return <Windows />
  return <MacOS />
})

ReactDOM.render(<App />, document.getElementById('root'));
