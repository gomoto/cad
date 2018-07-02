import * as React from 'react'
import { Structure } from './state';

// Components
import { StructureList } from './StructureList';
import { Viewer } from './Viewer';


export interface AppProps {
  structures: Structure[];
  loadFiles: (files: File[]) => void;
}

export class App extends React.PureComponent<AppProps> {
  private _rootElement: React.RefObject<HTMLMainElement>;

  constructor(props: AppProps) {
    super(props);
    this._rootElement = React.createRef();
  }

  componentDidMount(): void {
    const rootElement = this._rootElement.current as HTMLElement;

    // Load files via drag-and-drop
    rootElement.ondragover = (event) => {
      event.preventDefault();
    }

    rootElement.ondrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (!files) {
        return;
      }
      const fileArray: File[] = [];
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }
      this.props.loadFiles(fileArray);
    }
  }

  render() {
    return (
      <main
        className="app"
        ref={this._rootElement}
      >
        <StructureList
          structures={this.props.structures}
        />
        <Viewer
          structures={this.props.structures}
        />
      </main>
    );
  }
}
