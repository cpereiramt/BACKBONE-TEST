import { Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { AppContext } from "../components/AppContext"


const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = {
  statusCode?: number
}

/**
 * Error page
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#500-page
 */
function Error(props: Props) {
  const { statusCode } = props
  const classes = useStyles(props)
  return (
    <div className={classes.root}>

          <Typography variant="h5">
            Http status code {statusCode} error !
          </Typography>

    </div>
  )
}

Error.getInitialProps = async (ctx: AppContext): Promise<Props> => {
  const { err, res } = ctx
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
