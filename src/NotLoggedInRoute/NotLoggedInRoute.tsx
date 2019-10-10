import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import AuthContext from '../AuthContext';
import RouteRedirect from '../RouteRedirect';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not logged in, else render `Redirect`.
 */
export default function NotLoggedInRoute(props: RouteProps): JSX.Element {
  const { isLoggedIn, notLoggedInRedirectTo } = useContext(AuthContext);

  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

  if (loggedIn) {
    return <RouteRedirect {...props} to={notLoggedInRedirectTo} />;
  }

  return <Route {...props} />;
}
