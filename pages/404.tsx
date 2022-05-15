import { Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"


const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  })
)

type Props = {}

/**
 * 404 Error page without getInitialProps(SSR)
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-404-page
 * @see https://github.com/zeit/next.js/blob/master/errors/custom-error-no-custom-404.md
 */
function NotFoundError(props: Props) {
  const classes = useStyles(props)



  return (
    <div className={classes.root}>
          <Typography variant="h5">404 Page NotFound :(</Typography>
    </div>
  )
}

export default NotFoundError
