export interface State {
  structures: Structure[];
}

export const initialState: State = {
  structures: []
}

export interface Structure {
  id: string;
  data: File | Blob | string;
}
