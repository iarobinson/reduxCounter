window.onload = init;

function init() {

  const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }

  // const { createStore } = Redux;
  // THE ABOVE CODE DOES THE FOLLOWING.
  // IT IS REWRITTEN HERE SO WE GAIN A DEEPER
  //     UNDERSTANDING OF WHAT THE REDUX STORE IS.

  const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
    
    dispatch({});

    return { getState, dispatch, subscribe };
  }; 
  const store = createStore(counter);
  // var createStore = Redux.createStore;
  // import { createStore } from 'redux'     ---- With babel


  // REDUX CHORE IS 
      // 1. getState()
      // 2. dispatch()
      // 3. subscribe()

  const render = () => {
    document.body.innerText = store.getState();
  };

  store.subscribe(render);
  render();

  document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });

  
}
