import * as Redux from 'redux';

export const LOAD_FILES = 'load_files';

export interface LoadFilesAction extends Redux.Action {
  type: typeof LOAD_FILES;
  files: File[];
}

// NOTE: action creators must return plain objects, not classes
export function loadFile(files: File[]): LoadFilesAction {
  return {
    type: LOAD_FILES,
    files
  };
}

// Composite action
export type Action = (
  LoadFilesAction
);
