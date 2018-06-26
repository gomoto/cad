import * as NGL from 'ngl';

const stage = new NGL.Stage('root');
stage.loadFile('rcsb://1l2y', {defaultRepresentation: true});
