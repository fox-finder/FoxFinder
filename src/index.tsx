
import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { process } from 'engines/process'
import { option, Option } from 'engines/option'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragLayer } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { Header } from 'bases/layouts/header';
import { Desktop } from 'bases/layouts/desktop'
import { MenuProvider } from 'bases/layouts/menu'

import 'normalize.css'
import './styles/os.scss'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
};

const DragLayerComponent = DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(observer(props => {
  const { item, itemType, currentOffset, isDragging } = props;
  console.log('拖动的预览层', props, currentOffset)

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles as any}> 能有啥呢=123==123=1=23= {isDragging ? '是' : '否'} {JSON.stringify(item)}</div>
  )
}))

export const OS: React.FC = observer(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <DragLayerComponent /> */}
      <MenuProvider />
      <Header />
      <Desktop />
    </DndProvider>
  );
})

ReactDOM.render(<OS />, document.getElementById('os'))
