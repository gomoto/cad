import * as NGL from 'ngl';

const stage = new NGL.Stage('root', {
  ambientColor: 0xffffff,
  ambientIntensity: 0.5,
  backgroundColor: 0x151520,
  cameraFov: 30,
  cameraType: 'perspective',
  clipFar: 1000,
  clipNear: 0,
  lightColor: 0xffffff,
  lightIntensity: 0.5,
  panSpeed: 1.0,
  quality: 'high',
  rotateSpeed: 1.0,
  tooltip: false,
  zoomSpeed: 1.0,
});

stage.loadFile('rcsb://1l2y', {defaultRepresentation: true});
