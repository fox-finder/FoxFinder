
import { IFile, FileExtType } from 'types/file'
import { File } from 'engines/file'

export const FLODER_ICON_PATH = '/images/files/folder.svg'
export const FLODER_OPENED_ICON_PATH = '/images/files/folder-opened.svg'
export const FILE_ICON_PATH = '/images/files/file.svg'

export const ICON_PATHS = {
  [FileExtType.PSD]: '/images/files/psd.svg',
  [FileExtType.JPG]: '/images/files/jpg.svg',
  [FileExtType.MP4]: '/images/files/mpg.svg',
  [FileExtType.PPT]: '/images/files/ppt.svg',
  [FileExtType.DOC]: '/images/files/word.svg',
  [FileExtType.SVG]: '/images/files/svg.svg',
  [FileExtType.PDF]: '/images/files/pdf.svg',
  [FileExtType.XML]: '/images/files/xml.svg',
  [FileExtType.JS]: '/images/files/js.svg',
}

export function getIconPath(file: IFile): string {
  if (File.isDirectory(file)) {
    return FLODER_ICON_PATH
  }
  
  if (file.ext) {
    return ICON_PATHS[file.ext]
  }
  
  return FILE_ICON_PATH
}
