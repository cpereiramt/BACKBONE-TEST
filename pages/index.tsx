import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { AppContext } from "../components/AppContext"
import { fetchAllContactsAction } from "../store/contact"


const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = {}

function Index(props: Props) {
  const classes = useStyles(props)
  return (

    <div className={classes.root}>
      <p>index page{console.log(props)}</p>
    </div>
  )
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 */
Index.getInitialProps = async (ctx: AppContext): Promise<Props> => {
  const { store } = ctx
   store.dispatch(
    fetchAllContactsAction({
      offset: 3,
      limit: 10,
   })
  )
  return {props:'props'}

}

export default Index
