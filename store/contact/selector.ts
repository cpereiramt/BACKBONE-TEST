import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../reducers"
import { adapter, ContactState } from "./state"

const { selectAll, selectEntities } = adapter.getSelectors()

const featureStateSelector = (state: RootState) => state.contacts

const entitiesSelector = createSelector(featureStateSelector, selectEntities)

/**
 * isFetching selector
 */
export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state: ContactState) => state?.isFetching
)

/**
 * selectedId selector
 */
export const selectedIdSelector = createSelector(
  featureStateSelector,
  (state: ContactState) => state?.selectedId
)

/**
 * all contact selector
 */
export const allContactSelector = createSelector(featureStateSelector, selectAll)

/**
 * contact selector
 */
export const contactSelector = createSelector(
  entitiesSelector,
  selectedIdSelector,
  (entities, id) => (id ? entities[id] || null : null)
)
