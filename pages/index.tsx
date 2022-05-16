
import React, { useEffect } from "react";
import ContactTable from "../components/Table/";
import { useContact } from "../hooks";
import { Contact } from '../model/Contact';
import appStyles from "./indexStyles";
type Props = {}

function Index(props: Props) {
  const { fetchAllContacts } = useContact();
  const [contacts, setContacts] = React.useState<Contact[]>([])


    useEffect(() => {
      const results = fetchAllContacts();
      results.then(data => console.log(data));
      results.then(data => setContacts(data.contacts));

  }, [])
  const classes = appStyles(props)
   return (

     <div className={classes.indexBackground}>
       <div className={classes.indexTabletDiv}>
         <ContactTable contacts={contacts}  />
         </div>
    </div>
  );

}



export default Index


