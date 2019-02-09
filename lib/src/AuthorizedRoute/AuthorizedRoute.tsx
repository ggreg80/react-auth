import React, { useContext } from 'react';
import { LocationDescriptorObject } from 'history';
import { Route, RouteProps, Redirect, RouteComponentProps, withRouter } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface FromLocationState {
  from: string;
}

export interface FromLocationDescriptorObject extends LocationDescriptorObject {
  state?: FromLocationState;
}

export interface AuthorizedRouteProps {
  role: any;
}

export function getFromPath(location: FromLocationDescriptorObject, fallback: string): string {
  const { state: { from = fallback } = { from: fallback } } = location;
  return from;
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
      const to =
        typeof redirectTo === 'string'
          ? ({
              pathname: redirectTo,
              state: { from: location.pathname },
            } as FromLocationDescriptorObject)
          : redirectTo;

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
