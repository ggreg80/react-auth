import React, { useContext } from 'react';
import { Route, RouteProps, Redirect, RouteComponentProps, withRouter } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';
import getLocationWithState from '../getLocationWithState';

export interface AuthorizedRouteProps {
  role: any;
}

const AuthRoute = withRouter(
  ({
    isAuthorized,
    redirectTo,
    location,
    routeProps,
    role,
  }: AuthContextValue &
    RouteComponentProps &
    AuthorizedRouteProps & { routeProps: RouteProps }) => {
    const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;

    if (!authorized) {
      const { component, render, children, ...rest } = routeProps;
      const to = getLocationWithState(redirectTo, location);

      return (
        <Route {...rest}>
          <Redirect to={to} />
        </Route>
      );
    }

    return <Route {...routeProps} />;
  }
);

/**
 * Used with `AuthorizationProvider`.
 * Render `Route` if user is authorized, else render `Redirect`.
 */
export default function AuthorizedRoute({
  role,
  ...routeProps
}: AuthorizedRouteProps & RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={routeProps} role={role} />;
}
