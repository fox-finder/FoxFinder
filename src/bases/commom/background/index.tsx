
import React from 'react';
import styles from './background.module.scss';

export interface IBackgroundProps {

}

export const Background: React.FC<IBackgroundProps> = (props) => {
  return (
    <div
      className={styles.desktop}
    >
    </div>
  );
}
