export type State = any;

export interface Action {
    [key: string]: any;
    type: string;
}

export type Reducer = (state: State | undefined, action: Action) => State;

export interface Store {
    state: State;
    listeners: any[];
    storeReducer(state: State, action: Action): State;
    getState(): State;
    dispatch(action: Action): void;
    subscribe(fun: () => void): () => void;
    replaceReducer(nextReducer: Reducer): void;
}

export interface CombineReducer {
    [keys: string]: State;
}