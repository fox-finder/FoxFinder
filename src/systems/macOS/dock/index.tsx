
import React from 'react';
import classNames from 'classnames';
import { optionStore, GeneralSize } from 'stores/option';
import { applicationStore, ApplicationStore } from 'stores/application';
import { IRuntimeApplication, ApplicationType, ApplicationStatus } from 'types/application'
import { Background } from 'bases/materials/background'

import { DockItem, DockSeparator } from './Itme';
import styles from './dock.module.scss';

type TAppIndex = number | null | void

export const Dock: React.FC = () => {

  const [hoverIndex, setHoverIndex] = React.useState<TAppIndex>();
  // TODO: 右键上下文菜单的绑定及 blur 事件的设计
  const [contextMenuIndex, setContextMenuIndex] = React.useState<TAppIndex>();

  if (!applicationStore.berthViewApps.length) {
    return null
  }

  function getHoverClassName(index: number) {
    if (hoverIndex != null) {
      const classNameMap = {
        [hoverIndex]: styles.hover,
        [hoverIndex - 1]: styles.hoverPrev,
        [hoverIndex - 2]: styles.hoverSeparatedPrev,
        [hoverIndex + 1]: styles.hoverNext,
        [hoverIndex + 2]: styles.hoverSeparatedNext,
      }
      return classNameMap[index]
    }
  }

  // 当没有应用时，隐藏 dock

  return (
    <div id="dock" className={classNames(styles.dock, optionStore.isSmallSizeBerth && styles.small)}>
      <Background
        tag="ul"
        blur={true}
        className={styles.container}
      >
        {applicationStore.berthViewApps.map((app, index, apps) => {
          // 在固定应用与非固定但运行应用之间加间隔标示
          const nextApp = apps[index + 1]
          const renderSeparator = app.pinBerth && nextApp && !nextApp.pinBerth
          return (
            <React.Fragment key={app.id}>
              <DockItem
                name={app.name}
                icon={app.icon}
                active={ApplicationStore.isRunningStatus(app)}
                error={ApplicationStore.isErringStatus(app)}
                className={getHoverClassName(index)}
                onClick={() => applicationStore.runApp(app)}
                onContextmenu={() => console.log('点击了 app 的右键菜单', app)}
                onHover={() => setHoverIndex(index)}
                onCancelHover={() => setHoverIndex(null)}
              />
              {renderSeparator && (
                <DockSeparator />
              )}
            </React.Fragment>
          )
        })}
      </Background>
    </div>
  );
}
