import { Contact } from "./Contact";

// test data
export const testContacts: Contact[] = []

for (let i = 0; i < 6; i++) {
  testContacts.push({
    id: i + 1,
    firstName: `First ${i + 1}`,
    lastName: `Last ${i + 1}`,
    email: `${i}@test.com`,
    phone: `(${i+6})${i+7}-${i+8}-${i+9})`,
  })
}
