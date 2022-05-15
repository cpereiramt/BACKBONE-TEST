import { unwrapResult } from "@reduxjs/toolkit"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Contact } from "../model"
import {
  addContactAction,
  deleteContactAction,
  editContactAction,
  fetchAllContactsAction,
  fetchContactAction
} from "../store/contact/action"
import {
  allContactSelector, contactSelector, isFetchingSelector
} from "../store/contact/selector"

/**
 * CONTACT custom hook
 */
export const useContact = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)
  const contact = useSelector(contactSelector)
  const contacts = useSelector(allContactSelector)?.map((t) => ({
    id: t.id,
    firstName: t.firstName,
    lastName: t.lastName,
    email: t.email,
    phone: t.phone,
  }))

  const fetchAllContacts = useCallback(
    (arg?: { offset?: number; limit?: number }) => {
      return dispatch(
        fetchAllContactsAction({
          offset: arg?.offset || 0,
          limit: arg?.limit || 5,
        })
      ).then(unwrapResult)
    },
    [dispatch]
  )

  const fetchContact = useCallback(
    (arg: { id: number }) => {
      return dispatch(fetchContactAction(arg)).then(unwrapResult)
    },
    [dispatch]
  )

  const addContact = useCallback(
    async (arg: { contanct: Contact }) => {
      const action = await dispatch(addContactAction(arg))
      return unwrapResult(action)
    },
    [dispatch]
  )

  const editContact = useCallback(
    async (arg: { contanct: Contact }) => {
      const action = await dispatch(editContactAction(arg))
      return unwrapResult(action)
    },
    [dispatch]
  )

  const deleteContact = useCallback(
    (arg: { id: number }) => {
      return dispatch(deleteContactAction(arg)).then(unwrapResult)
    },
    [dispatch]
  )

  return {
    isFetching,
   contacts,
     contact,
    fetchAllContacts,
     fetchContact,
    addContact,
   editContact,
     deleteContact,
  } as const
}
