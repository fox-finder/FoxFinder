
import React from 'react';
import { observer } from 'mobx-react';
import { Window, TitleBar, Text } from 'react-desktop/windows';

export const Windows: React.FC = observer(() => {
  return (
    <div id="os">
      <br/>
      <Window
        chrome
        width={800}
        height={300}
        padding={20}
      >
        <TitleBar theme="dark" title="Windows Application" controls />
        <Text>I'm Windows</Text>
      </Window>
    </div>
  );
})
