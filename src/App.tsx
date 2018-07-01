import * as React from 'react'
import { differenceBy } from 'lodash';
import { Structure } from './state';
const NGL = require('ngl')

interface AppProps {
  structures: Structure[];
  loadFile: (files: File[]) => void;
}

class App extends React.PureComponent<AppProps, {}> {
  private _viewer: React.RefObject<HTMLDivElement>;
  private _stage: ngl.Stage | null;

  constructor(props: AppProps) {
    super(props);
    this._viewer = React.createRef();
    this._stage = null; // initialized in componentDidMount
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
      const fileArray: File[] = [];
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }
      // TODO: pluralize action creator
      this.props.loadFile(fileArray);
    }

    // Initialize NGL stage.
    this._stage = new (NGL.Stage as ngl.Stage)(viewerElement, {
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

  componentDidUpdate(oldProps: AppProps): void {
    const stage = this._stage as ngl.Stage;
    const enteringStructures = differenceBy(this.props.structures, oldProps.structures, 'id'); // current structures with ids not among those of previous structures
    // const exitingStructures = differenceBy(oldProps.structures, this.props.structures, 'id'); // previous structures with ids not among those of current structures
    const loadFiles = enteringStructures.map(structure => stage.loadFile(structure.data));
    Promise.all(loadFiles).then((components) => {
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
