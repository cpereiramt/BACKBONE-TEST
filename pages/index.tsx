/*
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
 */

import {
  NextComponentType, NextPageContext
} from 'next';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { addTodo } from '../redux/actions';
import Page from '../redux/container/page';
import { Store } from '../redux/store';

interface IndexPageContext extends NextPageContext {
  store: Store;
}

const IndexPage: NextComponentType<IndexPageContext> = compose()(Page);

IndexPage.getInitialProps = ({ store, req }) => {
  const isServer = !!req;

  // we can add any custom data here
  const { todo } = store.getState();
  store.dispatch(addTodo(Object.assign(todo.item, {
    value: 'Hello World!',
  })));

  return {
    isServer,
  };
}

export default connect()(IndexPage);
