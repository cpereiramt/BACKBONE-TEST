import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit"
import {
  addContactAction,
  deleteContactAction,
  editContactAction,
  fetchAllContactsAction,
  fetchContactAction
} from "./action"
import { adapter, ContactState, initialState } from "./state"

/**
 * CONTACT reducer
 */
export const contactReducer = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<ContactState>) =>
    builder
      .addCase(fetchAllContactsAction.pending, (state) => {
        return { ...state, isFetching: true }
      })
      .addCase(fetchAllContactsAction.fulfilled, (state, action) => {
        const { contacts } = action.payload
        return adapter.setAll({ ...state, isFetching: false }, contacts)
      })
      .addCase(fetchAllContactsAction.rejected, (state) => {
        return { ...state, isFetching: false }
      })
      //-------------------------------------------------------------------------------
      .addCase(fetchContactAction.pending, (state, action) => {
        const { id } = action.meta.arg
        return { ...state, isFetching: true, selectedId: id }
      })
      .addCase(fetchContactAction.fulfilled, (state, action) => {
        const { contacts } = action.payload
        return adapter.upsertOne({ ...state, isFetching: false }, contacts)
      })
      .addCase(fetchContactAction.rejected, (state) => {
        return { ...state, isFetching: false }
      })
      //-------------------------------------------------------------------------------
      .addCase(addContactAction.pending, (state, action) => {
        const { contact } = action.meta.arg
        return { ...state, isFetching: true, selectedId: contact?.id }
      })
      .addCase(addContactAction.fulfilled, (state, action) => {
        const { contacts } = action.payload
        return adapter.addOne({ ...state, isFetching: false }, contacts)
      })
      .addCase(addContactAction.rejected, (state) => {
        return { ...state, isFetching: false }
      })
      //-------------------------------------------------------------------------------
      .addCase(editContactAction.pending, (state, action) => {
        const { contact } = action.meta.arg
        return { ...state, isFetching: true, selectedId: contact?.id }
      })
      .addCase(editContactAction.fulfilled, (state, action) => {
        const { contacts } = action.payload
        return adapter.updateOne(
          { ...state, isFetching: false },
          {
            id: contacts.id,
            changes: contacts,
          }
        )
      })
      .addCase(editContactAction.rejected, (state) => {
        return { ...state, isFetching: false }
      })
      //-------------------------------------------------------------------------------
      .addCase(deleteContactAction.pending, (state, action) => {
        const { id } = action.meta.arg
        return { ...state, isFetching: true, selectedId: id }
      })
      .addCase(deleteContactAction.fulfilled, (state, action) => {
        const { id } = action.meta.arg
        return adapter.removeOne({ ...state, isFetching: false }, id)
      })
      .addCase(deleteContactAction.rejected, (state) => {
        return { ...state, isFetching: false }
      })
)
