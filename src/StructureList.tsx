import * as React from 'react';
import { Structure } from './state';

export interface StructureListProps {
  structures: Structure[];
}

export class StructureList extends React.PureComponent<StructureListProps> {
  render() {
    const listItems = this.props.structures.map(structure => (
      <li key={structure.id}>
        <span>{structure.id}</span>
      </li>
    ));
    return (
      <ul className="structure-list">
        {listItems}
      </ul>
    );
  }
}
