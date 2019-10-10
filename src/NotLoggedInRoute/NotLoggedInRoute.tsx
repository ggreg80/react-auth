import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
import RouteRedirect from '../RouteRedirect';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not logged in, else render `Redirect`.
 */
export default function NotLoggedInRoute(props: RouteProps): JSX.Element {
  const { isLoggedIn, notLoggedInRedirectTo } = useContext(AuthorizationContext);
  if (isLoggedIn()) {
    return <RouteRedirect {...props} to={notLoggedInRedirectTo} />;
  }
  return <Route {...props} />;
}
