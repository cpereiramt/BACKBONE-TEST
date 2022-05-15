import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const appStyles = makeStyles((theme: Theme) =>
  createStyles({
    indexBackground: { backgroundColor: theme.palette.primary.light, margin:'10px', width:"98vw", height:"100%" },
    indexTabletDiv: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",    }
  })
)

export default appStyles;
