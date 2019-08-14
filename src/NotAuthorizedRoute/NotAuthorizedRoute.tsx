import React, { useContext } from 'react';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface NotAuthorizedRouteProps {
  role: any;
}

const AuthRoute = withRouter(
  ({
    isAuthorized,
    notLoggedInRedirectTo,
    location,
    routeProps,
    role,
  }: AuthContextValue &
    RouteComponentProps &
    NotAuthorizedRouteProps & { routeProps: RouteProps }) => {
    const authorized = typeof isAuthorized === 'function' ? isAuthorized(role) : isAuthorized;

    if (authorized) {
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
 * Render `Route` if user is not authorized, else render `Redirect`.
 */
export default function NotAuthorizedRoute({
  role,
  ...routeProps
}: NotAuthorizedRouteProps & RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={routeProps} role={role} />;
}
