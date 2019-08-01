
import React from 'react';
import classnames from 'classnames';
import styles from './dock.module.scss';

const apps = [
  {
    name: 'Finder',
    icon: 'https://quietshu.github.io/cssosx/images/Finder.png',
    active: true,
    error: false
  },
  {
    name: "Launchpad",
    icon: "https://quietshu.github.io/cssosx/images/Launchpad.png",
  },
  {
    name: "Safari",
    icon: "https://quietshu.github.io/cssosx/images/Safari.png",
    active: true,
  },
  {
    name: "Chrome",
    icon: "https://quietshu.github.io/cssosx/images/Chrome.png",
  },
  {
    name: "AppLauncher",
    icon: "https://quietshu.github.io/cssosx/images/AppLauncher.png",
  },
  {
    name: "AppStore",
    icon: "https://quietshu.github.io/cssosx/images/AppStore.png",
    active: true,
  },
  {
    name: "iTunes",
    icon: "https://quietshu.github.io/cssosx/images/iTunes.png",
    active: true,
  },
  {
    name: "iBooks",
    icon: "https://quietshu.github.io/cssosx/images/iBooks.png",
  },
  {
    name: "Messages",
    icon: "https://quietshu.github.io/cssosx/images/Messages.png",
  },
  {
    name: "Evernote",
    icon: "https://quietshu.github.io/cssosx/images/Evernote.png",
  }
]

export const Dock: React.FC = () => {
  return (
    <div id="dock" className={styles.dock}>
      <ul className={styles.apps}>
        {apps.map((app, index) => (
          <li className={styles.item} key={index}>
            <span className={styles.name}>{app.name}</span>
            <img className={styles.icon} src={app.icon} />
            <span className={classnames(app.active && styles.active, app.error && styles.error)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
