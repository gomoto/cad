// NGL types
// TODO: get types from NGL

export as namespace ngl;

export interface Stage {
  new (element: HTMLElement, params?: {}): Stage;
  loadFile(file: File): Promise<StructureComponent | SurfaceComponent | VolumeComponent>;
  autoView(): void;
}

export type StructureRepresentationType = (
  'angle'|'axes'|'backbone'|'ball+stick'|'base'|'cartoon'|'contact'|'dihedral'|
  'distance'|'helixorient'|'hyperball'|'label'|'licorice'|'line'|'surface'|
  'ribbon'|'rocket'|'rope'|'spacefill'|'trace'|'tube'|'unitcell'
)

export type SurfaceRepresentationType = 'surface'|'dot'

export type VolumeRepresentationType = 'surface'|'slice'|'dot'

export interface Component {
  autoView: () => void;
}

export interface StructureComponent extends Component {
  type: 'structure';
  addRepresentation(
    type: StructureRepresentationType,
    params?: any
  ): any;
}

export interface SurfaceComponent extends Component {
  type: 'surface';
  addRepresentation(
    type: SurfaceRepresentationType,
    params?: any
  ): any;
}

export interface VolumeComponent extends Component {
  type: 'volume';
  addRepresentation(
    type: VolumeRepresentationType,
    params?: any
  ): any;
}

export interface StructureRepresentation {}
export interface SurfaceRepresentation {}
export interface VolumeRepresentation {}

export type StructureFileType = (
  'mmcif' | 'mcif' | 'cif' |
  'pdb' | 'ent' | 'pqr' |
  'sdf' | 'sd' |
  'gro' |
  'mol2' |
  'mmtf'
);

export type SurfaceFileType = (
  'obj' |
  'ply'
);

export type VolumeFileType = (
  'mrc' | 'map' | 'ccp4' |
  'cube' | 'cub' |
  'dsn6' | 'brix' |
  'dx' | 'dxbin' |
  'xplor' | 'cns'
);
