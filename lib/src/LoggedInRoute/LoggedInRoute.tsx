import React, { useContext } from 'react';
import { LocationDescriptorObject } from 'history';
import { Route, RouteProps, Redirect, withRouter, RouteComponentProps } from 'react-router';
import AuthContext, { AuthContextValue } from '../AuthContext';
import { FromLocationState } from '../AuthorizedRoute';

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
 * Render `Route` if user is logged in, else render `Redirect`.
 */
export default function LoggedInRoute(props: RouteProps): JSX.Element {
  const context = useContext(AuthContext);
  return <AuthRoute {...context} routeProps={props} />;
}
