const NGL = require('ngl');

const root = <HTMLElement> document.getElementById('root');

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
  const filePromises: Promise<ngl.StructureComponent | ngl.SurfaceComponent | ngl.VolumeComponent>[] = [];
  for (let i = 0; i < files.length; i++) {
    filePromises.push(stage.loadFile(files[i]));
  }
  Promise.all(filePromises)
  .then((components) => {
    components.forEach((component) => {
      switch (component.type) {
        case 'structure': {
          component.addRepresentation('cartoon');
          break;
        }
        case 'surface': {
          component.addRepresentation('surface');
          break;
        }
        case 'volume': {
          component.addRepresentation('dot');
          break;
        }
        default: {
          throw new Error('unknown component type');
        }
      }
    });
    stage.autoView();
  });
}

const Stage: ngl.Stage = NGL.Stage;

const stage = new Stage(root, {
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
