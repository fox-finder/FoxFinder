
import React from 'react';
import styles from './app.module.scss';
import { Desktop } from 'components/desktop';
import { Header } from 'components/header';
import { Dock } from 'components/dock';
import { Menu } from 'components/menu';

function test() {
  console.log('测试点击')
}

function testparent() {
  console.log('testparent')
}

function testchild() {
  console.log('testchild')
}

export const App: React.FC = () => {
  return (
    <div id="os" className={styles.os}>
      <Header />
      <Desktop />
      <Dock />
      <Menu
        x={400}
        y={200}
        raTop
        list={[
          { name: '关于系统', onClick: test },
          { name: '系统设置', active: true },
          { name: 'App Store' },
          {
            name: '最近使用的项目',
            onClick: testparent,
            childrens: [
              { name: '子菜单', onClick: testchild, }
            ]
          },
        ]}
      />
    </div>
  );
}
