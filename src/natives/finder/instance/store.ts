
import { IFile, FileType } from '@fox-finder/base'
import autobind from 'autobind-decorator'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'services/fetch'

export class FinderInstanceStore {

  @observable files: IFile[] = []

  @action.bound getFiles() {
    get('file/list', { path: '/Users/surmon/Projects/Blog/nodepress' }).then(files => {
      console.log('files', files)
      if (files && files.data) {
        this.files = files.data as IFile[]
      }
    })
  }
}
