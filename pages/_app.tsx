import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { NextPageContext } from 'next';
import withRedux from 'next-redux-wrapper';
import App from "next/app";
import React from "react";
import { MuiTheme } from "../components/MuiTheme";
import store, { Store } from '../redux/store';
// import { wrapper } from "../store/configureStore";
import "../styles/main.css";

interface AppContext extends NextPageContext {
  store: Store;
}

class MyApp extends App<AppContext> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentNode?.removeChild(jssStyles)
  }

  render() {
    const { store, Component, ...props } = this.props;

    return (

        <ThemeProvider theme={MuiTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>

    )
  }
}

export default withRedux(store)(MyApp);
