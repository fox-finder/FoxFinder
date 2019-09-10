
import { IFile, FileType } from '@fox-finder/base'
import { FILE_EXTS } from 'constants/file'

export const mockDesktopFiles: IFile[] = [
  {
    type: FileType.Directory,
    name: '我的收藏',
    path: '/us2r/xxx/xxx/我的收藏',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    path: '/usr/xxx/xxx3/xx.doc',
    name: '我的简历',
    ext: FILE_EXTS.DOC,
    size: 234234,
    create_at: 123213123,
    modify_at: 123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.Directory,
    name: '办公资料',
    path: '/usr/xx3x/xxx/办公资料',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    ext: FILE_EXTS.MP4,
    name: 'Linus的视频',
    path: '/usr/2xxx/xxx/Linus的视频.mp4',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    ext: FILE_EXTS.XML,
    name: '代码',
    path: '/usr/xx2x/xxx/代码.mp4',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    ext: FILE_EXTS.PSD,
    name: 'yige logo',
    path: '/usr/xxx4/xxx/yige logo.psd',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    ext: FILE_EXTS.XML,
    name: 'XML 文件',
    path: '/usr/xxx/x5xx/yige logo.psd',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
]

export const mockFinderFiles: IFile[] = [
  {
    type: FileType.Directory,
    name: '我的音乐',
    path: '/usr/6xxx/xxx/music',
    size: 1231873,
    create_at: 123123123,
    modify_at: 123123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    path: '/usr/xxx/xx7x/xx.jpg',
    name: '我的照片',
    ext: FILE_EXTS.JPG,
    size: 234234,
    create_at: 123213123,
    modify_at: 123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  },
  {
    type: FileType.File,
    path: '/usr/x3xx/xxx/xx.js',
    name: '前端代码',
    ext: FILE_EXTS.JS,
    size: 234234,
    create_at: 123213123,
    modify_at: 123123,
    readable: true,
    writeable: true,
    unix: {
      mode_stat: 'rw- --- ---'
    }
  }
]
