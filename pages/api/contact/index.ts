import { NextApiRequest, NextApiResponse } from "next";
import { ApiErrorResponse } from "../../../model/ApiErrorResponse";

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
        const insertedContact = {
          id:'23232ewwewe232323232',
          firstName: 'testName',
          lastName: 'testLastName',
          email: 'testEmail',
          phone: '5565992188269',
        }
        const inserted = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/`, {
       method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({  insertedContact}),
    })
        res.status(200).json(inserted.json());
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
