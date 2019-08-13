
import React from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";
import { Window, Button, WindowContent, WindowHeader } from "react95";
import { IWindowProps } from './';
import styles from './window.module.scss';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export const Window95: React.FC<IWindowProps> = (props) => {
  return (
    <>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <Window style={{ width: 400 }}>
          <WindowHeader
            className={props.handleClassName}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>react95.exe</span>
            <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>
              <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
            </Button>
          </WindowHeader>
          <WindowContent>
            <div className={styles.content}>{props.children}</div>
          </WindowContent>
        </Window>
      </ThemeProvider>
    </>
  )
}
