
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { MenuItem, IMenuItemProps } from './Item';

export enum KeyType {
  Left = 'left',
  Right = 'right'
}

export enum PositionType {
  Mouse = 'mouse',
  Element = 'element'
}

export interface IMenuRegisterOptions {
  key?: KeyType
  position?: PositionType
  // onOpen() {},
  // onClose() {},
}

const DEFAULT_POSITION = {
  x: 0,
  y: 0
};

export class MenuStore {

  @observable visible: boolean = false;
  @observable position = DEFAULT_POSITION;
  @observable.shallow menuList = null;

  constructor() {
    this.reset()
  }

  @action.bound
  update(position: any, menuList: any) {
    this.visible = true;
    this.position = position;
    this.menuList = menuList;
  }

  @action
  reset() {
    this.visible = false;
    this.position = DEFAULT_POSITION;
    this.menuList = null;
  }

  @autobind
  register(menuList: IMenuItemProps[], registerOptions: IMenuRegisterOptions = {}) {

    registerOptions.key = registerOptions.key || KeyType.Right;
    registerOptions.position = registerOptions.position || PositionType.Mouse;

    const eventHandle = (event: any) => {
      event.preventDefault();

      const targetElement = event.currentTarget;

      const targetPotition = {
        x: event.pageX,
        y: event.pageY,
      }
    
      this.update(targetPotition, menuList)
      console.log('点击事件', this, targetPotition, menuList)
    }

    if (registerOptions.key === KeyType.Left) {
      return { onClickCapture: eventHandle.bind(this) }
    }

    if (registerOptions.key === KeyType.Right) {
      return { onContextMenuCapture: eventHandle.bind(this) }
    }
  }
}

export default new MenuStore()
