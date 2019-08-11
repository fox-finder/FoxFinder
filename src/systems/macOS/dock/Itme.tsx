
import React from 'react';
import cns from 'classnames';
import styles from './dock.module.scss';

export interface IProps {
  name: string // app name
  icon: string // app icon url/base64
  className?: string
  active?: boolean // is activited
  error?: boolean // app error status
  onClick(): void
  onHover(): void
  onCancelHover(): void
}

export const DockItem: React.FC<IProps> = (props) => {
  return (
    <li
      onMouseEnter={props.onHover}
      onMouseLeave={props.onCancelHover}
      className={cns(
        styles.item,
        props.className,
        props.active && styles.active,
        props.error && styles.error
      )}
    >
      <span className={styles.name}>{props.name}</span>
      <img className={styles.icon} src={props.icon} />
      <span className={styles.indicator} />
    </li>
  );
}

export const DockSeparator: React.FC = () => {
  return (
    <li className={styles.separator} />
  );
}
