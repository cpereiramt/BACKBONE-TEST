import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"
import { Contact } from "../../model"

export interface ContactState extends EntityState<Contact> {
  isFetching: boolean
  selectedId: number | null
}

export const adapter = createEntityAdapter<Contact>({
  selectId: (contact: Contact) => contact.id,
})

export const initialState: ContactState = adapter.getInitialState({
  isFetching: false,
  selectedId: null,
})
