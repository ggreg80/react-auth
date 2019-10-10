import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import AuthContext from '../AuthContext';
import RouteRedirect from '../RouteRedirect';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute(props: RouteProps): JSX.Element {
  const { isLoggedIn, redirectTo } = useContext(AuthContext);

  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

  if (!loggedIn) {
    return <RouteRedirect {...props} to={redirectTo} />;
  }

  return <Route {...props} />;
}
