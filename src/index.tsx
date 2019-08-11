
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { applicationStore } from 'stores/application';
import { optionStore, systemMap } from 'stores/option';

import 'normalize.css';
import './styles/os.scss';

export const App: React.FC = observer(() => {
  const System = systemMap[optionStore.personalize.system]
  return <System />
})

ReactDOM.render(<App />, document.getElementById('root'));
