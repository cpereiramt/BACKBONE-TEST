import {
  applyMiddleware,
  compose, createStore, Store as ReduxStore
} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers, { initialState } from './reducers';

const dev: boolean = process.env.NODE_ENV !== 'production';

export type Store = ReduxStore<typeof initialState>;

export default (state = initialState): Store => {
  const middlewares = dev ? [thunkMiddleware, createLogger()] : [];
  return createStore(reducers, state, compose(applyMiddleware(...middlewares)));
};
