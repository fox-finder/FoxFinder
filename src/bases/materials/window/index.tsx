
import React from 'react';
import { OptionStore } from "stores/option";
import { SystemType } from "types/system";
import { MacOS } from "./MacOS";
import { Windows } from "./Windows";
import { Win95 } from "./Win95";
import styles from './window.module.scss';

export interface IWindowProps {
  title: string
  handleClassName: string
  children?: React.ReactElement
}

export const Window: React.FC<IWindowProps> = (props) => {

  const TargetWindow = OptionStore.normalizeComponent({
    [SystemType.MacOS]: MacOS,
    [SystemType.Windows]: Windows,
    [SystemType.Win95]: Win95,
  })

  return (
    <TargetWindow {...props} />
  );
}
