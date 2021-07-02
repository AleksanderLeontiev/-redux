import { Action, Reducer, State, Store } from "./types";

export function createStore(
  reducer: Reducer,
  preLoadedState?: State | undefined
): Store {
  return {
    state: preLoadedState,
    listeners: new Set(),
    storeReducer(state: State, action: Action): State {
      return reducer(state, action);
    },
    getState() {
      return this.state;
    },
    dispatch(action: Action): void {
      this.state = this.storeReducer(this.state, action);
      this.listeners.forEach((subscriber) => {
        return subscriber();
      });
    },
    subscribe(subscriber: () => void): () => void {
      this.listeners.add(subscriber);
      return () => this.listeners.delete(subscriber);
    },
    replaceReducer(nextReducer: Reducer): void {
      this.storeReducer = nextReducer;
    },
  };
}
