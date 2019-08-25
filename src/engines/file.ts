
import { observable, computed, action } from 'mobx'
import { IFile, PayloadType } from 'types/file'
import { mockDesktopFiles } from 'mock/file'

export class File {

  constructor() {
    this.fetchDesktopFiles()
  }
  
  // Desktop files
  @observable desktopFiles: IFile[] = []
  
  @action updateDesktopFiles(files: IFile[]): void {
    this.desktopFiles = files
  }
  
  fetchDesktopFiles(): void {
    Promise.resolve().then(() => {
      this.updateDesktopFiles(mockDesktopFiles)
    })
  }

  static openFile(file: IFile): void {
    console.log('打开这个文件', file)
  }

  static isDirectory(file: IFile): boolean {
    return file.type === PayloadType.Directory
  }
  
  static isFile(file: IFile): boolean {
    return file.type === PayloadType.File
  }
}

export const file = new File()
