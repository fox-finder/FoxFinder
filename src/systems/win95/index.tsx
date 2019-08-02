
import React from 'react';
import { observer } from 'mobx-react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, Window, WindowContent, WindowHeader, List, ListItem, Divider } from "react95";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export const Win95: React.FC = observer(() => {
  return (
    <div id="os">
      <br/>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <Window>
          <WindowHeader>Win95 app</WindowHeader>
          <WindowContent>
            <List>
                <ListItem>🎤 Sing</ListItem>
                <ListItem>💃🏻 Dance</ListItem>
                <Divider />
                <ListItem disabled>I'm Win95</ListItem>
            </List>
          </WindowContent>
        </Window>
      </ThemeProvider>
    </div>
  );
})
