import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import AuthContext from '../AuthContext';
import RouteRedirect from '../RouteRedirect';

export interface AuthorizedRouteProps extends RouteProps {
  role: any;
}

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is authorized, else render `Redirect`.
 */
export default function AuthorizedRoute({
  role,
  ...routeProps
}: AuthorizedRouteProps): JSX.Element {
  const { isAuthorized, redirectTo } = useContext(AuthContext);

  const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;

  if (!authorized) {
    return <RouteRedirect {...routeProps} to={redirectTo} />;
  }

  return <Route {...routeProps} />;
}
