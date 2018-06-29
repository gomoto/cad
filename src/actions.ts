import * as Redux from 'redux';

export const LOAD_FILES = 'load_files';

export class LoadFilesAction implements Redux.Action {
  type = LOAD_FILES;
  constructor(files: File[]) {}
}

export function loadFile(files: File[]): LoadFilesAction {
  return new LoadFilesAction(files);
}
