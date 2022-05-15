import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit"
import { MakeStore } from "next-redux-wrapper"
import { Env } from "../constants"
import { rootReducer, RootState } from "./reducers"
import { createWrapper } from 'next-redux-wrapper';

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
 */
const middlewares = [...getDefaultMiddleware<RootState>()]

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: Env.NODE_ENV === "development",
})

const makeStore: MakeStore = (_?: RootState): EnhancedStore => store
export  const wrapper = createWrapper(makeStore);
