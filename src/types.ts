export interface Action {
  type: string;
  payload?: string;
}

export type State = string;

export type Reducer = (state: State | undefined, action: Action) => State;

export interface Store {
  storeReducer(state: State, action: Action): State;
  getState(): State;
  dispatch(action: Action): void;
  subscribe(subscriber: () => void): () => void;
  replaceReducer(nextReducer: Reducer): void;
  state: State;
  listeners: [];
}

export interface CombineReducer {
  [keys: string]: State;
}
