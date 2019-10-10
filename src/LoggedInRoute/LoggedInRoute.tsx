import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute(props: RouteProps): JSX.Element {
  const { isLoggedIn, redirectTo } = useContext(AuthorizationContext);
  if (!isLoggedIn()) {
    return <RouteRedirect {...props} to={redirectTo} />;
  }
  return <Route {...props} />;
}
