import * as React from 'react';
import { differenceBy } from 'lodash';
import { Structure } from './state';
const NGL = require('ngl')


export interface ViewerProps {
  structures: Structure[];
}

export class Viewer extends React.PureComponent<ViewerProps> {
  private _viewer: React.RefObject<HTMLDivElement>;
  private _stage: ngl.Stage | null;

  constructor(props: ViewerProps) {
    super(props);
    this._viewer = React.createRef();
    this._stage = null; // initialized in componentDidMount
  }

  componentDidMount(): void {
    // Initialize NGL stage.
    this._stage = new (NGL.Stage as ngl.Stage)(this._viewer.current as HTMLElement, {
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

  componentDidUpdate(oldProps: ViewerProps): void {
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
      <div
        className="viewer"
        ref={this._viewer}
      />
    );
  }
}
