import * as Redux from 'redux';
import { Structure } from './state';


export const LOAD_FILES = 'load_files';
export const REMOVE_STRUCTURES = 'remove_structures';

export interface LoadFilesAction extends Redux.Action {
  type: typeof LOAD_FILES;
  files: File[];
}

export interface RemoveStructuresAction extends Redux.Action {
  type: typeof REMOVE_STRUCTURES;
  structures: Structure[];
}

// NOTE: action creators must return plain objects, not classes
export function loadFiles(files: File[]): LoadFilesAction {
  return {
    type: LOAD_FILES,
    files
  };
}

export function removeStructures(structures: Structure[]): RemoveStructuresAction {
  return {
    type: REMOVE_STRUCTURES,
    structures
  }
}

// Composite action
export type Action = (
  LoadFilesAction |
  RemoveStructuresAction
);
