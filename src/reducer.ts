import { State, initialState, Structure } from './state';
import { Action, LOAD_FILES, REMOVE_STRUCTURES } from './actions';


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case LOAD_FILES: {
      const files = action.files;
      const structures = files.map(file => ({
        id: file.name,
        data: file
      }));
      return {
        ...state,
        structures: state.structures.concat(structures)
      };
    }
    case REMOVE_STRUCTURES: {
      const structuresToRemoveById = action.structures.reduce<{[structureId: string]: Structure}>((_structures, structure) => {
        _structures[structure.id] = structure;
        return _structures;
      }, {});
      return {
        ...state,
        structures: state.structures.filter(structure => !structuresToRemoveById[structure.id])
      };
    }
    default: {
      return state;
    }
  }
}
