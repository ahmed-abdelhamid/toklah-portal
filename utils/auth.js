import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

// Redirect on Error
export const redirectTo = (ctx, path) => {
  if (typeof window !== 'undefined') {
    Router.push(path);
  } else {
    ctx.res.writeHead(302, { location: path });
    ctx.res.end();
  }
};

// Login Admin
// export const login = async ({ token }) => {
//   cookie.set('token', token, { expires: 1 });
//   Router.push('/clients');
// };

// Logout Admin
// export const logout = () => {
//   cookie.remove('token');
//   // To support logging out from all windows
//   window.localStorage.setItem('logout', Date.now());
//   Router.push('/login');
// };

// Gets the display name of JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

// Check if User is Authorized or Not
export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    syncLogout(event) {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { location: '/login' });
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen in client
  if (!token) {
    Router.push('/login');

    return token;
  }
};

// Change Password
export const changePassword = async (token, id, newPassword, oldPassword) => {
  await axios.put(
    `${process.env.API_URL}/admin/changepassword`,
    {
      adminId: id,
      oldPassword,
      newPassword
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Forget Password
export const forgetPassword = async email => {
  try {
    await axios.put(`${process.env.API_URL}/admin/forgotpassword`, { email });
  } catch (e) {
    throw new Error(e);
  }
};
