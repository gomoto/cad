import * as React from 'react'
import { Structure } from './state';
const NGL = require('ngl')

interface AppProps {
  structures: Structure[];
  loadFile: (files: File[]) => void;
}

class App extends React.PureComponent<AppProps, {}> {
  private _viewer: React.RefObject<HTMLDivElement>

  constructor(props: AppProps) {
    super(props);
    this._viewer = React.createRef();
  }

  componentDidMount(): void {
    const viewerElement = this._viewer.current as HTMLDivElement;

    // Load PDB file via drag-and-drop
    viewerElement.ondragover = (event) => {
      event.preventDefault();
    }

    viewerElement.ondrop = (event) => {
      event.preventDefault();

      const files = event.dataTransfer.files;
      if (!files) {
        return;
      }
      this.props.loadFile([files[0]]);
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

    const stage = new Stage(viewerElement, {
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
  }

  render() {
    return (
      <main className="app">
        <div
          className="viewer"
          ref={this._viewer}
        >
        </div>
      </main>
    );
  }
}

export { App };
