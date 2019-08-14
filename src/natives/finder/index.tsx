
import React from 'react';
import { IAppRendererProps } from 'bases/renderers';

export const Finder: React.FC<IAppRendererProps> = ({ app }) => {
  return (
    <div>
      <span>I am Finder app component, {JSON.stringify(app)}</span>
    </div>
  );
}
