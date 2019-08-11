
import React from 'react';
import classNames from 'classnames';
import { optionStore, GeneralSize } from 'stores/option';
import { applicationStore, ApplicationStore } from 'stores/application';
import { IApplication, ApplicationType, ApplicationStatus } from 'types/application'
import { Background } from 'bases/background'

import { DockItem, DockSeparator } from './Itme';
import styles from './dock.module.scss';

type THoverIndex = number | null | void

export const Dock: React.FC = () => {

  const [hoverIndex, setHoverIndex] = React.useState<THoverIndex>();

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
            <React.Fragment key={index}>
              <DockItem
                name={app.name}
                icon={app.icon}
                active={ApplicationStore.isRunningApp(app)}
                error={ApplicationStore.isErringApp(app)}
                className={getHoverClassName(index)}
                onClick={() => console.log('点击了 app', app)}
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
