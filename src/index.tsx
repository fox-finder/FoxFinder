
import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { process } from 'engines/process'
import { option, Option } from 'engines/option'
import { SystemType } from 'types/system'
import { MacOS } from 'systems/macOS'
import { Windows } from 'systems/windows'

import 'normalize.css'
import './styles/os.scss'

export const App: React.FC = observer(() => {
  const System = Option.normalizeComponent({
    [SystemType.MacOS]: MacOS,
    [SystemType.Windows]: Windows,
  })
  return <System />
})

ReactDOM.render(<App />, document.getElementById('root'))
