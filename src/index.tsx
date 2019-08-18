
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { applicationStore } from 'stores/application';
import { optionStore, OptionStore } from 'stores/option';
import { SystemType } from 'types/system';
import { MacOS } from 'systems/macOS';
import { Windows } from 'systems/windows';

import 'normalize.css';
import './styles/os.scss';

export const App: React.FC = observer(function App() {
  const System = OptionStore.normalizeComponent({
    [SystemType.MacOS]: MacOS,
    [SystemType.Windows]: Windows,
  })
  return <System />
})

ReactDOM.render(<App />, document.getElementById('root'));

// (document.body as any).onbeforeunload = function (event: any) {
//   var rel = "asdfawfewf";
//   if (!window.event) {
//     event.returnValue = rel;
//   } else {
//     (window.event as any).returnValue = rel;
//   }
// };
