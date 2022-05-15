import { NextApiRequest, NextApiResponse } from "next"
import { Contact } from "../../../model"
import { ApiErrorResponse } from "../../../model/ApiErrorResponse"
import { testContacts } from "../../../model/TestData"

/**
 * CONTACT restful-api
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  try {
    res.setHeader("Content-Type", "application/json")
    switch (method) {
      case "GET":
        res.status(200).json({firstName: "First", lastName: "Last", email: "cpere@gmail.c", phone: "(123)456-7890"})
        break
      case "POST":
        if (!body) {
          const error: ApiErrorResponse = {
            statusCode: 400,
            message: `Request body is required.`,
          }
          res.status(400).json(error)
          return
        }

        const newContact: Contact = body
        const lastContact = testContacts.slice(-1)[0]
        newContact.id = lastContact.id + 1
        newContact.firstName = testContacts.slice(-1)[0].firstName
        newContact.lastName = testContacts.slice(-1)[0].lastName
        testContacts.push(newContact)
        res.status(201).json(newContact)
        break
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  } catch (e) {
    const error: ApiErrorResponse = {
      statusCode: 500,
      message: `Internal server error aqui. ${e}`,
    }
    res.status(500).json(error)
  }
}
