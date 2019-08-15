
import React from 'react';
import classNames from 'classnames';
import { IWindowProps } from '../window';
import styles from './window.module.scss';

export const Widget: React.FC<IWindowProps> = (props) => {
  return (
    <div className={classNames(styles.window, styles.noBorder)}>
      {props.children}
    </div>
  )
}
