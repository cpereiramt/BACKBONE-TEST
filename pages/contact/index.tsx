import { createStyles, makeStyles, Theme } from "@material-ui/core"
import React, { useEffect } from "react"
import { useContact } from "../../hooks"
const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = { }

function Contact(props: Props) {
  const { fetchAllContacts } = useContact();
  const {} = props
  const classes = useStyles(props)
  useEffect(() => {
    const results = fetchAllContacts().then((data) => {console.log(data) });
    console.log(results);
  }, [])
  return (
    <div className={classes.root}>
      <h1>contacts :</h1>
    </div>
  )
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 */


export default Contact
