import { State, initialState } from './state';
import { Action, LOAD_FILES } from './actions';


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
    default: {
      return state;
    }
  }
}
