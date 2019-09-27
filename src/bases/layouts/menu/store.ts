
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { event, Event } from 'engines/event'
import { MENU_ID } from 'constants/id';
import { MenuItem, IMenuItemProps } from 'bases/layouts/menu/Item';
import { IMenuList } from 'bases/layouts/menu/List';

export enum MouseKeyType {
  Left = 'left',
  Right = 'right'
}

export interface IMenuRegisterOptions {
  key?: MouseKeyType
  // onOpen() {},
  // onClose() {},
}

export interface IMenuProviderProps {
  x: number
  y: number
  visible?: boolean
  list?: IMenuList
  children?: React.ReactChildren
}

const DEFAULT_POSITION = {
  x: 0,
  y: 0
};

export class Menu {

  @observable visible: boolean = false;
  @observable position = DEFAULT_POSITION;
  @observable.shallow menuList: IMenuList = null;

  constructor() {
    this.reset()
    this.listenMouseDown()
  }

  private listenMouseDown() {
    event.addMouseDownListener(event => {
      const isHitMenu = Event.isHitMousedownTargetElementID(event, MENU_ID)
      isHitMenu || this.hidden()
    })
  }

  @action update(position: any, menuList: IMenuList) {
    this.visible = true;
    this.position = position;
    this.menuList = menuList;
  }

  @action.bound hidden() {
    this.visible = false;
  }

  @action.bound reset() {
    this.hidden()
    this.menuList = null;
    this.position = DEFAULT_POSITION;
  }

  @autobind register(menuList: IMenuList, registerOptions: IMenuRegisterOptions = {}) {

    registerOptions.key = registerOptions.key || MouseKeyType.Right;

    const eventHandle = (event: any) => {
      event.preventDefault();
      const targetPotition = {
        x: event.pageX,
        y: event.pageY,
      }
    
      this.update(targetPotition, menuList)
      console.log('点击事件', this, targetPotition, menuList)
    }

    if (registerOptions.key === MouseKeyType.Left) {
      return { onClickCapture: eventHandle.bind(this) }
    }

    if (registerOptions.key === MouseKeyType.Right) {
      return { onContextMenuCapture: eventHandle.bind(this) }
    }
  }
}

export const menuStore = new Menu()
