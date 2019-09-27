
import React from 'react';
import classNames from 'classnames'
import { observer } from 'mobx-react';
import { Tooltip, Title } from 'bases/layouts/tooltip'
import { Icon } from 'bases/materials/icon'
import { isDisabledTooltip } from './'
import styles from './header.module.scss';

export const Launcher: React.FC = observer(() => {
  return (
    <Tooltip
      hover={{
        content: <Title>全部应用</Title>,
        interactive: false
      }}
      disabled={isDisabledTooltip.get()}
      className={classNames(styles.launch, styles.action)}
      onClick={() => {
        console.log('打开全部引用')
      }}
    >
      <Icon
        className={styles.svgIcon}
        src="/images/icons/menu.svg"
      />
    </Tooltip>
  );
})
