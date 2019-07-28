
import React from 'react';
import styles from './desktop.module.scss';

export const Desktop: React.FC = () => {
  return (
    <div
      id="desktop"
      className={styles.desktop}
      style={{ backgroundImage: `url('/images/wallpapers/Sierra.jpg')` }}
    >
    </div>
  );
}
