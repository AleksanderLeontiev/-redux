export interface Action {
  type: string;
  payload?: unknown;
  [key: string]: unknown;
}

export type State = any;

export type Reducer = (state: State | undefined, action: Action) => State;

export interface Store {
  storeReducer(state: State, action: Action): State;
  getState(): State;
  dispatch(action: Action): void;
  subscribe(subscriber: () => void): () => void;
  replaceReducer(nextReducer: Reducer): void;
  state: State;
  listeners: Set<any>;
}

export interface CombineReducer {
  [keys: string]: State;
}
