import React from 'react';
import { compose } from 'recompose';
import Todo from './todo';

const Page = (props) => {
  // defined in the `containers/page.ts`, so the `props` is like this:
  //
  // const {
  //   item,
  //   data,
  //   onChangeTodo,
  //   addTodo,
  //   deleteTodo,
  // } = props;
  //
  return <Todo {...props} />;
};

export default compose()(Page);
