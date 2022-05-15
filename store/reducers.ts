import { combineReducers } from "redux"
import { contactReducer } from "./contact"

/**
 * Combine reducers
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript
 */
export const rootReducer = combineReducers({
  contacts: contactReducer,
})

export type RootState = ReturnType<typeof rootReducer>
