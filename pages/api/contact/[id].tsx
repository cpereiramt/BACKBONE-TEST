import { NextApiRequest, NextApiResponse } from "next"
import { ApiErrorResponse } from "../../../model/ApiErrorResponse"
import { Contact } from '../../../model/Contact'
/**
 * CONTACT restful-api with path-parameter
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
    body
  } = req

  try {
    res.setHeader("Content-Type", "application/json")


    // find data

    switch (method) {
      case "GET":
         const response = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${id}`)
        const contact = await response.json();
        if (!contact) {
          const error: ApiErrorResponse = {
            statusCode: 404,
            message: `Contact with id ${id} not found.`,
          }
          res.status(404).json(error)
          return
        }
        res.status(200).json(contact)
        break
      case "PUT":
        const newContact: Contact = body
        newContact.firstName = 'testName'// newContact.firstName
        newContact.lastName = 'testLastName'// newContact.lastName
        newContact.email = 'testEmail' // newContact.email
       const result = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${id}`, {
       method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({contanct: newContact}),
    })

        res.status(200).json({result })
        break
      case "POST":
        const insertedContact = {
          firstName: 'testName',
          lastName: 'testLastName',
          email: 'testEmail',
          phone: '5565992188269',
        }
        const inserted = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${id}`, {
       method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({contanct: insertedContact}),
    })
        res.status(200).json(`inserted ${inserted}`)
        break
      case "DELETE":
         const deleteResponse = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${id}`)
         deleteResponse.json();
        res.status(200).json(`${id} deleted"`)
        break
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  } catch (e) {
    const error: ApiErrorResponse = {
      statusCode: 500,
      message: `Internal server error id. ${e}`,
    }
    res.status(500).json(error)
  }
}
