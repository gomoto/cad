import * as NGL from 'ngl';

const root = document.getElementById('root');

// Load PDB file via drag-and-drop
root.ondragover = (event) => {
  event.preventDefault();
}
root.ondrop = (event) => {
  event.preventDefault();

  const files = event.dataTransfer.files;

  if (!files) {
    return;
  }

  const firstFile = files[0];

  stage.loadFile(firstFile)
  .then((structureComponent) => {
    structureComponent.addRepresentation('cartoon');
    structureComponent.autoView();
  });
}

const stage = new NGL.Stage(root, {
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
