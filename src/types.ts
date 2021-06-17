export interface Action {
    type: string;
    payload?: any;
}

export type State = any;

export type Reducer = (state: State | undefined, action: Action) => State;

export interface Store {
    storeReducer(state: State,action: Action): State;
    getState(): State;
    dispatch(action: Action): void;
    subscribe(subscriber: () => void): () => void;
    replaceReducer(nextReducer: Reducer): void;
    state: State;
    listeners: any[];
}

export interface CombineReducer {
    [keys: string]: State;
}
// export type Middleware<State, Action> = (
//     store: Store
// ) => (next: (action: Action) => any) => (action: Action) => any;