import { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "../../../model";
import { ApiErrorResponse } from "../../../model/ApiErrorResponse";
import { testContacts } from "../../../model/TestData";

/**
 * CONTACT restful-api
 * @param req NextApiRequest
 * @param res NextApiResponse
 */

async function fetchMetaData() {
  const allData: any = [];
  let morePagesAvailable = true;
  let currentPage = 0;

  while(morePagesAvailable) {
    currentPage++;
    const response = await fetch(`https://bkbnchallenge.herokuapp.com/contacts?page=${currentPage}`)
    const { results, totalPages } = await response.json();
    results.forEach(e => allData.unshift(e));
    morePagesAvailable = currentPage < totalPages;
  }

  return allData;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  try {
    res.setHeader("Content-Type", "application/json")
    switch (method) {
      case "GET":
        // const data = await fetch('https://bkbnchallenge.herokuapp.com/contacts')
        const contacts = await fetchMetaData();
        res.status(200).json( contacts );
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
