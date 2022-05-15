import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../../model";
import { FeatureKey } from "../featureKey";

/**
 * Fetch all contact action
 */
export const fetchAllContactsAction = createAsyncThunk(
  `${FeatureKey.CONTACT}/fetchAll`,
  async (arg: { offset: number; limit: number }) => {
    const { offset, limit } = arg
    const url = `/api/contact?offset=${offset}&limit=${limit}`
    const result: Contact[] = await fetch(url, {
      method: "get",
    }).then((response: Response) => response.json())
    return { contacts: result }
  }
)

/**
 * Fetch contact action
 */
export const fetchContactAction = createAsyncThunk(
  `${FeatureKey.CONTACT}/fetch`,
  async (arg: { id: number }) => {
    const { id } = arg
    const url = `/api/contact/${id}`
    const result: Contact = await fetch(url, {
      method: "get",
    }).then((response: Response) => response.json())
    return { contacts: result }
  }
)

/**
 * Add contact action
 */
export const addContactAction = createAsyncThunk(
  `${FeatureKey.CONTACT}/add`,
  async (arg: { contact: Contact }) => {
    const { contact } = arg
    const url = `/api/contact`
    const result: Contact = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    }).then((response: Response) => response.json())
    return { contacts: result }
  }
)

/**
 * Edit contact action
 */
export const editContactAction = createAsyncThunk(
  `${FeatureKey.CONTACT}/edit`,
  async (arg: { contact: Contact }) => {
    const { contact } = arg
    const url = `/api/contact/${contact.id}`
    const result: Contact = await fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    }).then((response: Response) => response.json())
    return { contacts: result }
  }
)

/**
 * Delete contact action
 */
export const deleteContactAction = createAsyncThunk(
  `${FeatureKey.CONTACT}/delete`,
  async (arg: { id: number }) => {
    const { id } = arg
    const url = `/api/contact/${id}`
    await fetch(url, {
      method: "delete",
    })
  }
)
