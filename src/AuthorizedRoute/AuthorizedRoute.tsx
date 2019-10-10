import React, { useContext } from 'react';
import { Route, RouteProps } from 'react-router';
import { AuthorizationContext } from '../AuthorizationProvider';
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
  const { isAuthorized, redirectTo } = useContext(AuthorizationContext);
  const authorized = isAuthorized ? isAuthorized(role) : true;
  if (!authorized) {
    return <RouteRedirect {...routeProps} to={redirectTo} />;
  }
  return <Route {...routeProps} />;
}
