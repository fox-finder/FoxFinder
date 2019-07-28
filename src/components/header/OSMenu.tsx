
import React from 'react';
import styles from './header.module.scss';

function openAbout() {
  console.log('打开关于系统')
}

export const OSMenu: React.FC = () => {
  return (
    <div className={styles.osMenu}>
      <i className="iconfont icon-apple" />
    </div>
  );
}
