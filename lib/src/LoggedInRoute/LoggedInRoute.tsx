import React, { useContext } from 'react';
import { LocationDescriptorObject } from 'history';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';

export interface FromLocationState {
  from: string;
}

export interface FromLocationDescriptorObject extends LocationDescriptorObject {
  state?: FromLocationState;
}

const AuthRoute = withRouter(
  ({
    isLoggedIn,
    redirectTo,
    location,
    routeProps,
  }: AuthContextValue & RouteComponentProps & { routeProps: RouteProps }) => {
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : isLoggedIn;

    if (!loggedIn) {
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
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute(props: RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={props} />;
}
