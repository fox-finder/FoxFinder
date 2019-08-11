
import React from 'react';
import { Desktop as BaseDesktop } from 'bases/desktop'
import { optionStore } from 'stores/option';
import { Window } from '../window';

export const Desktop: React.FC = () => {
  return (
    <BaseDesktop
      appIconsProps={{
        isRightStart: !optionStore.isLeftDirectionWithIcon
      }}
      appWindowsProps={{
        windowComponent: Window
      }}
    />
  );
}