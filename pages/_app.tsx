import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import App from "next/app";
import React from "react";
import { MuiTheme } from "../components/MuiTheme";
import { wrapper } from "../store/configureStore";
import "../styles/main.css";

type Props = {
  Component: any
  store: any
}

/**
 * @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
 */
class MyApp extends App<Props> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentNode?.removeChild(jssStyles)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
        <ThemeProvider theme={MuiTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
    )
  }
}

export default wrapper.withRedux(MyApp);
