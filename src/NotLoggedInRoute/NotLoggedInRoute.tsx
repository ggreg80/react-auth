import React, { useContext } from 'react';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

const AuthRoute = withRouter(
  ({
    isLoggedIn,
    notLoggedInRedirectTo,
    location,
    routeProps,
  }: AuthContextValue & RouteComponentProps & { routeProps: RouteProps }) => {
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

    if (loggedIn) {
      const { component, render, children, ...rest } = routeProps;
      const to =
        typeof notLoggedInRedirectTo === 'string'
          ? { pathname: notLoggedInRedirectTo, state: location.state }
          : notLoggedInRedirectTo;
      return <Route {...rest} render={() => <Redirect to={to} />} />;
    }

    return <Route {...routeProps} />;
  }
);

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not logged in, else render `Redirect`.
 */
export default function NotLoggedInRoute(props: RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={props} />;
}
