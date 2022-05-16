import { Button, createStyles, InputLabel, makeStyles, TextField, Theme } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContact } from "../../../hooks";
import { Contact } from "../../../model";

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = { }
const EditContact = (props: Props) => {
  const [contact, setContact] = useState()
  const { fetchContact, deleteContact, editContact } = useContact();
  const { } = props
  const classes = useStyles(props)
  const router = useRouter()
  const id = router.query.id as any
  useEffect(() => {
    const contact = fetchContact(id);
    contact.then(data => setContact(data.contacts));

  }, [])
  const handleUpdate = async (contact: Contact) => {
    console.log(contact, 'update')
   await editContact(contact);
  }
  const handleDelete = async () => {
    await deleteContact(id);
    //  router.push('/')
  };
  return (

    <div style={{margin: '10px', display: 'flex', justifyContent: 'space-between', wrap: 'wrap', flexDirection:'column'}}>
      {contact && (
        <>
          <InputLabel>ID </InputLabel><TextField value={contact.id} disabled />
          <InputLabel>Name </InputLabel><TextField value={contact.firstName}  />
          <InputLabel>Last Name </InputLabel><TextField value={contact.lastName}  />
          <InputLabel>Email </InputLabel><TextField value={contact.email}  />
          <div>
          <Button variant="outlined" color="primary" onClick={() => handleDelete()}>Delete Contact</Button>
            <Button onClick={() => handleUpdate(contact)}>Update Information</Button>
          </div>
        </>
      )
      }

</div>
    )


}


export default EditContact;
