
import { observable, computed, action } from 'mobx';

export class User {
  
  @observable uid: string = ''
  @observable token: string = ''
  @observable.ref permissions: string[] = []
  
}

export const user = new User()
