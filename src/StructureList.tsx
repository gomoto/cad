import * as React from 'react';
import { Structure } from './state';

export interface StructureListProps {
  structures: Structure[];
  removeStructures(structures: Structure[]): void;
}

export class StructureList extends React.PureComponent<StructureListProps> {
  render() {
    const listItems = this.props.structures.map(structure => (
      <li key={structure.id}>
        <span>{structure.id}</span>
        <span onClick={this.props.removeStructures.bind(this.props, [structure])}>Remove</span>
      </li>
    ));
    return (
      <ul className="structure-list">
        {listItems}
      </ul>
    );
  }
}
