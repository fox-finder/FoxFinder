
import React from 'react';
import { Desktop as BaseDesktop } from 'bases/desktop'
import { getAppWindowHandleClassName } from 'bases/desktop/Windows'
import { WidgetApp } from 'bases/application/Widget'
import { IframeApp } from 'bases/application/Iframe'
import { optionStore } from 'stores/option';
import { IApplication, ApplicationType } from 'types/application';
// import { Window } from '../window';
import { Window, TitleBar, Text, SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';

export const Desktop: React.FC = () => {
  return (
    <BaseDesktop
      appIconsProps={{ isRightStart: !optionStore.isLeftDirectionWithIcon }}
      appWindowsProps={{
        appRender(app: IApplication) {

          // Widget -> 调用 Widget 组件 <Widget app={app} /> 作为全部内容调用
          if (app.type === ApplicationType.Widget) {
            return <WidgetApp app={app} />
          }

          // TODO: 判断类型，app/iframe/widget 分别输出不同的内容，可能没有 window 底盘呢
          // 所以，这里可以使用 bases/application 了
          // app 自己渲染
          // iframe -> 调用 iframe 组件 <IframeApp app={app} /> 作为内容调用
          return (
            <Window
              chrome
              width={700}
              height={400}
              padding={0}
            >
              <TitleBar
                title={app.name}
                className={getAppWindowHandleClassName(app.name)}
                controls
              />
              {
                app.type === ApplicationType.Iframe
                  ? <IframeApp app={app} />
                  : app.component
              }
            </Window>
          )
        }
      }}
    />
  );
}