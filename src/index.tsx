import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, Dispatch } from 'redux';
import { App } from './App';
import { reducer } from './reducer';
import { loadFile } from './actions';
import { State } from './state';


const store = createStore(reducer);

const mapStateToProps = (state: State) => {
  return {
    structures: state.structures
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadFile: (files: File[]) => {
      dispatch(loadFile(files))
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
