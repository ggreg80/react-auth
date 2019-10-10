import React, { useContext } from 'react';
import { Route } from 'react-router';
import AuthContext from '../AuthContext';
import RouteRedirect from '../RouteRedirect';
import { AuthorizedRouteProps } from '../AuthorizedRoute';

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is not authorized, else render `Redirect`.
 */
export default function NotAuthorizedRoute({
  role,
  ...routeProps
}: AuthorizedRouteProps): JSX.Element {
  const { isAuthorized, notLoggedInRedirectTo } = useContext(AuthContext);

  const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;

  if (authorized) {
    return <RouteRedirect {...routeProps} to={notLoggedInRedirectTo} />;
  }

  return <Route {...routeProps} />;
}
