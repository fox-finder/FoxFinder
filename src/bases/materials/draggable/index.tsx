
import React from 'react';
import styles from './draggable.module.scss';

export interface IDraggableProps {

}

export const Draggable: React.FC<IDraggableProps> = (props) => {
  return (
    <div className={styles.draggable}>
    </div>
  );
}
