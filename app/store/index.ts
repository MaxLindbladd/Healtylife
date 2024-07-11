import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import stepsReducer from './reducers/stepsReducer';
import creditsReducer from './reducers/creditsReducer';
import { RootState, ActionTypes } from './types';

// Combine reducers
const rootReducer = combineReducers<RootState>({
  steps: stepsReducer,
  credits: creditsReducer
});

// Create store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
