import { Button, createStyles, InputLabel, makeStyles, TextField, Theme } from "@material-ui/core";
import router from "next/router";
import React from "react";
import { useContact } from "../../hooks";

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = { }
const AddContact = (props: Props) => {
    const { addContact } = useContact();
  const newContact = {
    id:'455666gghghttttytyty',
    firstName: 'clayton',
    lastName: 'pereira',
    email: 'cpereiramt@gmail.com',
    phone: '5565992188269',
  }
  const handleCreateContact =   () => {
    addContact(newContact);

  }
  const { } = props

  return (

    <div style={{margin: '10px', display: 'flex', justifyContent: 'space-between', wrap: 'wrap', flexDirection:'column'}}>

        <>
          <InputLabel>Name </InputLabel><TextField   />
          <InputLabel>Last Name </InputLabel><TextField   />
          <InputLabel>Email </InputLabel><TextField   />
          <div>
          <Button variant="outlined" color="primary" onClick={() => handleCreateContact(newContact)} >
            Create Contact</Button>
           <Button variant="outlined" color="primary" onClick={() => router.push('/')} >
          Back</Button>
          </div>
        </>
</div>
    )


}

export default AddContact;
