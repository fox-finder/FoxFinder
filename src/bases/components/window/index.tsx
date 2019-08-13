
import React from 'react';
import styles from './window.module.scss';
import { Window as MacOSWindow, TitleBar as MacOSTitleBar } from 'react-desktop/macOs';
import { Window as WWindow, TitleBar as WindowTitleBar } from 'react-desktop/windows';
import { Window95 } from "./Win95";

export interface IWindowProps {
  title: string
  handleClassName: string
  children?: React.ReactElement
}

export const Window: React.FC<IWindowProps> = (props) => {
  return (
    <Window95 {...props} />

    // <WWindow
    //   chrome
    //   width={700}
    //   height={400}
    //   padding={0}
    // >
    //   <WindowTitleBar title={props.title} className={props.handleClassName} controls />
    //   <div className={styles.content}>{props.children}</div>
    // </WWindow>

    // <MacOSWindow
    //   chrome
    //   width={700}
    //   height={400}
    //   padding={0}
    // >
    //   <MacOSTitleBar title={props.title} className={props.handleClassName} controls />
    //   <div className={styles.content}>{props.children}</div>
    // </MacOSWindow>
  );
}
