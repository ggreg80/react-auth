import React, { useContext } from 'react';
import { LocationDescriptorObject, Location } from 'history';
import { Route, RouteProps, Redirect, RouteComponentProps, withRouter } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface FromLocationState {
  from: Pick<Location, 'pathname' | 'search' | 'state'>;
}

export interface AuthorizedRouteProps {
  role: any;
}

export function getFromPath(location: Location<FromLocationState>, fallback: string): string {
  return (location.state && location.state.from && location.state.from.pathname) || fallback;
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
      const to: LocationDescriptorObject<FromLocationState> =
        typeof redirectTo === 'string'
          ? {
              pathname: redirectTo,
              state: {
                from: {
                  pathname: location.pathname,
                  search: location.search,
                  state: location.state,
                },
              },
            }
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
