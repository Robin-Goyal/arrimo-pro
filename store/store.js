import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlices, { userInitialState } from '../redux-modules/User/userSlices';

const loadState = () => {
  try {
    let serializedState = localStorage.getItem("arrimo-pro");

    if (serializedState === null) {
      const initialState = initializeState();
      return initialState;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    const initialState = initializeState();
    return initialState
  }
}

const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("arrimo-pro", serializedState);
  }
  catch (err) {
  }
}

export const initializeState = () => {
  return {
    user: userInitialState,
  };
}

const rootReducers = combineReducers({
  user: userSlices
})

const storechecked = {
  reducer: rootReducers,
  preloadedState: loadState(),
}

const store = configureStore(storechecked)

store.subscribe(() => {
  saveState(store.getState())
})



export default store;