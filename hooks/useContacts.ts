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
export const useContact =  () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)
  const contact = useSelector(contactSelector)
  const contacts = useSelector(allContactSelector).map((t) => ({
    id: t.id,
    firstName: t.firstName,
    lastName: t.lastName,
    email: t.email,
    phone: t.phone,
  }))

  const fetchAllContacts =
    (arg?: { offset?: number; limit?: number }) => {
      return dispatch(
        fetchAllContactsAction({
          offset: arg?.offset || 0,
          limit: arg?.limit || 5,
        })
      ).then(unwrapResult)
    }



  const fetchContact = useCallback(
    (arg: { id: number }) => {
      return dispatch(fetchContactAction(arg)).then(unwrapResult)
    },
    [dispatch]
  )

  const addContact =
    async (arg: { contancts: Contact }) => {
      console.log(arg, "====================================================>")
      const action = await dispatch(addContactAction(arg))
      console.log(action, "====================================================>")
      return unwrapResult(action)
    }

  const editContact =
    async (arg: { contanct: Contact }) => {

      const action = await dispatch(editContactAction(arg))
      return unwrapResult(action)
    }


  const deleteContact =
    async (arg: { id: number }) => {
      const action = await dispatch(deleteContactAction(arg))
      return unwrapResult(action)
    }

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
