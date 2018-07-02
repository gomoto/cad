import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, Dispatch } from 'redux';
import { App } from './App';
import { reducer } from './reducer';
import { loadFiles, removeStructures } from './actions';
import { State, Structure } from './state';


const store = createStore(reducer);

const mapStateToProps = (state: State) => {
  return {
    structures: state.structures
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadFiles: (files: File[]) => {
      dispatch(loadFiles(files))
    },
    removeStructures: (structures: Structure[]) => {
      dispatch(removeStructures(structures))
    }
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
