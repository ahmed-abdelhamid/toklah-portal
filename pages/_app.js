import React from 'react';
import nextCookie from 'next-cookies';
import { Provider } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import NProgress from 'nprogress';
import Router from 'next/router';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { initStore } from '../redux/store';
import Header from '../components/Header';
import translations from '../translations/arabicTranslation';
import { getAdmin } from '../redux/actions/authActions';
import { redirectTo } from '../utils/auth';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let { token } = nextCookie(ctx);

    if (!token && ctx.pathname !== '/') {
      redirectTo(ctx, '/');
    }

    if (token && ctx.pathname === '/') {
      try {
        await ctx.store.dispatch(getAdmin(token));
        redirectTo(ctx, '/users');
      } catch (e) {}
    }

    if (token && ctx.pathname !== '/' && ctx.isServer) {
      try {
        await ctx.store.dispatch(getAdmin(token));
      } catch (e) {
        redirectTo(ctx, '/');
      }
    }

    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      },
      authenticated: token ? true : false
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title>{translations.TITLE}</title>
          </Head>
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {this.props.authenticated ? (
                <Header>
                  <Component {...pageProps} />
                </Header>
              ) : (
                <Component {...pageProps} />
              )}
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
