
import React from 'react';
import { OptionStore } from "stores/option";
import { SystemType } from "types/system";
import { MacOS } from "./MacOS";
import { Windows } from "./Windows";
import { Win95 } from "./Win95";
import { Widget } from "./Widget";
import styles from './window.module.scss';

export interface IWindowProps {
  title: string
  border?: boolean
  maximized?: boolean
  actived?: boolean
  handleClassName: string
  onActivate?(): void
  onClose(): void
  onMaximize?(): void
  onMinimize?(): void
  onToggle?(): void
  children?: React.ReactElement
}

export const Window: React.FC<IWindowProps> = (props) => {

  if (!props.border) {
    return (
      <Widget {...props} />
    )
  }

  const TargetWindow = OptionStore.normalizeComponent({
    [SystemType.MacOS]: MacOS,
    [SystemType.Windows]: Windows,
    [SystemType.Win95]: Win95,
  })

  return (
    <TargetWindow {...props} />
  );
}
