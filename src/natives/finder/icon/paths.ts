
import { IFile, FileType } from '@fox-finder/base'
import { isDirectory } from 'engines/file'
import { FILE_EXTS } from 'constants/file'

export const FLODER_ICON_PATH = '/images/files/folder.svg'
export const FLODER_OPENED_ICON_PATH = '/images/files/folder-opened.svg'
export const FILE_ICON_PATH = '/images/files/file.svg'

export const ICON_PATHS = {
  [FILE_EXTS.PSD]: '/images/files/psd.svg',
  [FILE_EXTS.JPG]: '/images/files/jpg.svg',
  [FILE_EXTS.MP4]: '/images/files/mpg.svg',
  [FILE_EXTS.PPT]: '/images/files/ppt.svg',
  [FILE_EXTS.DOC]: '/images/files/word.svg',
  [FILE_EXTS.SVG]: '/images/files/svg.svg',
  [FILE_EXTS.PDF]: '/images/files/pdf.svg',
  [FILE_EXTS.XML]: '/images/files/xml.svg',
  [FILE_EXTS.JS]: '/images/files/js.svg',
}

export function getIconPath(file: IFile): string {
  if (isDirectory(file)) {
    return FLODER_ICON_PATH
  }

  return file.ext
    ? ICON_PATHS[file.ext]
    : FILE_ICON_PATH
}
