import { createStore } from "./createStore";

describe("functional interface", () => {
  it("returns state based on initial state", () => {
    const state = { name: "Bob" };
    expect(createStore(() => undefined).getState()).toBe(undefined);
    expect(createStore(() => undefined, state).getState()).toBe(state);
  });

  it("calculates new state with reducer call", () => {
    const action1 = { type: "Action1" };
    const action2 = { type: "Action2" };
    const reducer = jest.fn((state = 1) => state + 1);
    const store = createStore(reducer);
    store.dispatch(action1);
    expect(reducer).toHaveBeenCalledWith(undefined, action1);
    expect(store.getState()).toBe(2);
    store.dispatch(action2);
    expect(reducer).toHaveBeenCalledWith(2, action2);
    expect(store.getState()).toBe(3);
  });
  it("notifies listeners about updates", () => {
    const action1 = { type: "Action1" };
    const action2 = { type: "Action2" };
    const reducer = jest.fn((state = 1) => state + 1);
    const store = createStore(reducer);
    const spy = jest.fn();
    store.subscribe(spy);
    expect(spy).not.toHaveBeenCalled();
    store.dispatch(action1);
    expect(spy).toHaveBeenCalled();
    store.dispatch(action2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("allows to unsubscribe from the events", () => {
    const action1 = { type: "Action1" };
    const action2 = { type: "Action2" };
    const reducer = jest.fn((state = 1) => state + 1);
    const store = createStore(reducer);
    const spy = jest.fn();
    const unsubscribe = store.subscribe(spy);
    expect(spy).not.toHaveBeenCalled();
    store.dispatch(action1);
    expect(spy).toHaveBeenCalled();
    unsubscribe();
    store.dispatch(action2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("change a reducer", () => {
    const action1 = { type: "Action3" };
    const reducer = jest.fn((state = 3) => state + 1);
    const store = createStore(reducer);
    store.dispatch(action1);
    expect(reducer).toHaveBeenCalledWith(undefined, action1);
    expect(store.getState()).toBe(4);
    const nextReducer = jest.fn((state) => state - 2);
    store.replaceReducer(nextReducer);
    store.dispatch(action1);
    expect(reducer).toHaveBeenCalledWith(undefined, action1);
    expect(store.getState()).toBe(2);
  });
});
